from fastapi import APIRouter, Request, HTTPException, Header
from typing import Optional
import json
from svix.webhooks import Webhook, WebhookVerificationError
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import logging

router = APIRouter()

# Configuration de la base de données
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://targetym_user:targetym2024@localhost:5432/targetym_ai")
CLERK_WEBHOOK_SECRET = os.getenv("CLERK_WEBHOOK_SECRET")

# Configuration des logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db_connection():
    """Créer une connexion à la base de données PostgreSQL"""
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def create_user_in_db(user_data: dict):
    """Créer un utilisateur dans la base PostgreSQL"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Extraire les données utilisateur de Clerk
        clerk_id = user_data.get("id")
        email = user_data.get("email_addresses", [{}])[0].get("email_address")
        first_name = user_data.get("first_name", "")
        last_name = user_data.get("last_name", "")
        created_at = user_data.get("created_at")
        
        # Vérifier si l'utilisateur existe déjà
        cursor.execute("SELECT id FROM users WHERE clerk_id = %s", (clerk_id,))
        existing_user = cursor.fetchone()
        
        if not existing_user:
            # Insérer le nouvel utilisateur
            insert_query = """
                INSERT INTO users (clerk_id, email, first_name, last_name, created_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """
            cursor.execute(insert_query, (clerk_id, email, first_name, last_name, created_at))
            user_id = cursor.fetchone()["id"]
            
            conn.commit()
            logger.info(f"Utilisateur créé avec succès: {email} (ID: {user_id})")
            
        else:
            logger.info(f"Utilisateur existe déjà: {email}")
            
        cursor.close()
        conn.close()
        
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'utilisateur: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
            conn.close()
        raise e

def update_user_in_db(user_data: dict):
    """Mettre à jour un utilisateur dans la base PostgreSQL"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        clerk_id = user_data.get("id")
        email = user_data.get("email_addresses", [{}])[0].get("email_address")
        first_name = user_data.get("first_name", "")
        last_name = user_data.get("last_name", "")
        updated_at = user_data.get("updated_at")
        
        # Mettre à jour l'utilisateur
        update_query = """
            UPDATE users 
            SET email = %s, first_name = %s, last_name = %s, updated_at = %s
            WHERE clerk_id = %s
        """
        cursor.execute(update_query, (email, first_name, last_name, updated_at, clerk_id))
        
        if cursor.rowcount > 0:
            conn.commit()
            logger.info(f"Utilisateur mis à jour: {email}")
        else:
            logger.warning(f"Utilisateur non trouvé pour mise à jour: {clerk_id}")
            
        cursor.close()
        conn.close()
        
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour de l'utilisateur: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
            conn.close()
        raise e

def delete_user_from_db(clerk_id: str):
    """Supprimer un utilisateur de la base PostgreSQL"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Marquer l'utilisateur comme supprimé (soft delete)
        delete_query = """
            UPDATE users 
            SET is_active = FALSE, deleted_at = CURRENT_TIMESTAMP
            WHERE clerk_id = %s
        """
        cursor.execute(delete_query, (clerk_id,))
        
        if cursor.rowcount > 0:
            conn.commit()
            logger.info(f"Utilisateur marqué comme supprimé: {clerk_id}")
        else:
            logger.warning(f"Utilisateur non trouvé pour suppression: {clerk_id}")
            
        cursor.close()
        conn.close()
        
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'utilisateur: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
            conn.close()
        raise e

@router.post("/webhooks/clerk")
async def handle_clerk_webhook(
    request: Request,
    svix_id: Optional[str] = Header(None, alias="svix-id"),
    svix_timestamp: Optional[str] = Header(None, alias="svix-timestamp"),
    svix_signature: Optional[str] = Header(None, alias="svix-signature")
):
    """
    Gérer les webhooks de Clerk pour synchroniser les utilisateurs
    """
    if not CLERK_WEBHOOK_SECRET:
        logger.error("CLERK_WEBHOOK_SECRET non configuré")
        raise HTTPException(status_code=500, detail="Configuration webhook manquante")
    
    # Récupérer le body de la requête
    body = await request.body()
    
    # Vérifier la signature du webhook
    try:
        wh = Webhook(CLERK_WEBHOOK_SECRET)
        payload = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    except WebhookVerificationError as e:
        logger.error(f"Erreur de vérification webhook: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook non valide")
    
    # Parser les données JSON
    try:
        event_data = json.loads(payload)
        event_type = event_data.get("type")
        user_data = event_data.get("data")
        
        logger.info(f"Webhook reçu: {event_type}")
        
        # Traiter selon le type d'événement
        if event_type == "user.created":
            create_user_in_db(user_data)
            logger.info("Nouvel utilisateur synchronisé depuis Clerk")
            
        elif event_type == "user.updated":
            update_user_in_db(user_data)
            logger.info("Utilisateur mis à jour depuis Clerk")
            
        elif event_type == "user.deleted":
            clerk_id = user_data.get("id")
            delete_user_from_db(clerk_id)
            logger.info("Utilisateur supprimé depuis Clerk")
            
        else:
            logger.info(f"Type d'événement non géré: {event_type}")
            
        return {"status": "success", "message": f"Événement {event_type} traité"}
        
    except Exception as e:
        logger.error(f"Erreur lors du traitement du webhook: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne")

@router.get("/webhooks/clerk/test")
async def test_webhook_connection():
    """
    Test de la connexion à la base de données pour les webhooks
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()["count"]
        cursor.close()
        conn.close()
        
        return {
            "status": "success",
            "message": "Connexion DB OK",
            "users_count": count,
            "webhook_secret_configured": bool(CLERK_WEBHOOK_SECRET)
        }
    except Exception as e:
        logger.error(f"Erreur de test webhook: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
