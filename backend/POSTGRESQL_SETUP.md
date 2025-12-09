# Configuration PostgreSQL pour Targetym AI

## Installation de PostgreSQL

### 1. Installation sur Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2. Configuration initiale
```bash
# Démarrer PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Se connecter à PostgreSQL
sudo -u postgres psql
```

### 3. Créer la base de données et l'utilisateur
```sql
-- Dans psql
CREATE DATABASE targetym_ai;
CREATE USER targetym_user WITH PASSWORD 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE targetym_ai TO targetym_user;
\q
```

## Configuration du backend

### 1. Installer les dépendances PostgreSQL
```bash
cd /home/anna/targetym-ai/backend
pip install psycopg2-binary
```

### 2. Créer le fichier de configuration .env
Créez le fichier `/home/anna/targetym-ai/backend/.env` :

```env
# Database Configuration
DATABASE_URL=postgresql://targetym_user:votre_mot_de_passe_securise@localhost/targetym_ai

# JWT Configuration
SECRET_KEY=votre_cle_secrete_jwt_tres_longue_et_securisee
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application Configuration
DEBUG=True
CORS_ORIGINS=["http://localhost:3000"]
```

### 3. Modifier database.py pour PostgreSQL
Le fichier sera automatiquement mis à jour pour utiliser PostgreSQL au lieu de SQLite.

### 4. Variables d'environnement de développement
```bash
# Pour tester localement avec PostgreSQL
export DATABASE_URL="postgresql://targetym_user:votre_mot_de_passe_securise@localhost/targetym_ai"
export SECRET_KEY="votre_cle_secrete_jwt_tres_longue_et_securisee"
```

## Commandes utiles PostgreSQL

### Connexion à la base de données
```bash
psql -h localhost -U targetym_user -d targetym_ai
```

### Voir les tables
```sql
\dt
```

### Voir la structure d'une table
```sql
\d users
\d user_sessions
```

### Sauvegarder la base de données
```bash
pg_dump -h localhost -U targetym_user targetym_ai > backup.sql
```

### Restaurer la base de données
```bash
psql -h localhost -U targetym_user targetym_ai < backup.sql
```

## Migration depuis SQLite

Si vous avez déjà des données dans SQLite, vous pouvez les migrer :

1. Exporter les données depuis SQLite
2. Adapter le format pour PostgreSQL
3. Importer dans PostgreSQL

## Production

Pour la production, utilisez des variables d'environnement sécurisées :
- `DATABASE_URL` : URL complète de la base PostgreSQL
- `SECRET_KEY` : Clé secrète forte pour JWT
- `CORS_ORIGINS` : Domaines autorisés pour CORS

## Sécurité

1. Changez le mot de passe par défaut
2. Utilisez des mots de passe forts
3. Configurez les permissions réseau appropriées
4. Activez SSL en production
5. Sauvegardez régulièrement la base de données
