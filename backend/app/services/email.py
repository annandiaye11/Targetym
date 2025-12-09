"""
Email service using Resend for transactional emails.
"""

from typing import List, Optional
import os
from resend import Resend
from app.core.config import settings

# Initialize Resend client
resend = Resend(api_key=settings.RESEND_API_KEY) if settings.RESEND_API_KEY else None


async def send_email(
    to: List[str],
    subject: str,
    html: str,
    from_email: Optional[str] = None,
    from_name: Optional[str] = None,
    reply_to: Optional[str] = None,
) -> bool:
    """
    Send an email using Resend.
    
    Args:
        to: List of recipient email addresses
        subject: Email subject
        html: HTML content of the email
        from_email: Sender email (defaults to settings.EMAILS_FROM_EMAIL)
        from_name: Sender name (defaults to settings.EMAILS_FROM_NAME)
        reply_to: Reply-to email address
        
    Returns:
        bool: True if email was sent successfully, False otherwise
    """
    
    if not resend:
        print("Warning: Resend not configured. Email not sent.")
        return False
    
    try:
        sender = f"{from_name or settings.EMAILS_FROM_NAME} <{from_email or settings.EMAILS_FROM_EMAIL}>"
        
        params = {
            "from": sender,
            "to": to,
            "subject": subject,
            "html": html,
        }
        
        if reply_to:
            params["reply_to"] = reply_to
            
        response = resend.emails.send(params)
        return True
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


async def send_welcome_email(user_email: str, user_name: str) -> bool:
    """Send welcome email to new user."""
    
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Bienvenue sur Targetym AI ! 🎉</h1>
        
        <p>Bonjour {user_name},</p>
        
        <p>Nous sommes ravis de vous accueillir sur Targetym AI, la plateforme d'analytique RH alimentée par l'IA.</p>
        
        <p>Voici ce que vous pouvez faire maintenant :</p>
        <ul>
            <li>Configurer votre profil d'entreprise</li>
            <li>Ajouter vos premiers employés</li>
            <li>Explorer nos tableaux de bord analytiques</li>
            <li>Découvrir nos insights IA</li>
        </ul>
        
        <div style="margin: 30px 0; text-align: center;">
            <a href="https://targetym-ai.vercel.app/dashboard" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Accéder à mon tableau de bord
            </a>
        </div>
        
        <p>Si vous avez des questions, n'hésitez pas à nous contacter à support@targetym.ai</p>
        
        <p>Cordialement,<br>L'équipe Targetym AI</p>
    </div>
    """
    
    return await send_email(
        to=[user_email],
        subject="Bienvenue sur Targetym AI ! 🎉",
        html=html,
    )


async def send_password_reset_email(user_email: str, reset_token: str) -> bool:
    """Send password reset email."""
    
    reset_url = f"https://targetym-ai.vercel.app/auth/reset-password?token={reset_token}"
    
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Réinitialisation de votre mot de passe</h1>
        
        <p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte Targetym AI.</p>
        
        <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
        
        <div style="margin: 30px 0; text-align: center;">
            <a href="{reset_url}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Réinitialiser mon mot de passe
            </a>
        </div>
        
        <p><strong>Ce lien est valide pendant 48 heures.</strong></p>
        
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
        
        <p>Cordialement,<br>L'équipe Targetym AI</p>
    </div>
    """
    
    return await send_email(
        to=[user_email],
        subject="Réinitialisation de votre mot de passe - Targetym AI",
        html=html,
    )
