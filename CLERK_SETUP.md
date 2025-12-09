# 🔐 Configuration Clerk - Targetym AI

## 📋 Setup Clerk Dashboard

1. **Créer un compte Clerk** : https://clerk.dev
2. **Créer une nouvelle application** : "Targetym AI"
3. **Configurer les providers** :
   - ✅ Email/Password
   - ✅ Google OAuth
   - ✅ GitHub OAuth (optionnel)

## 🔧 Variables d'environnement

### Frontend (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_WEBHOOK_SECRET=whsec_...
```

### Backend (.env)
```env
CLERK_WEBHOOK_SECRET=whsec_...
CLERK_SECRET_KEY=sk_test_...
```

## 🎨 Configuration Clerk Dashboard

### 1. Appearance (Branding)
- **Primary Color**: #3B82F6 (bleu Targetym)
- **Logo**: Upload du logo Targetym
- **Background**: #F8FAFC

### 2. Paths & URLs
- **Sign-in URL**: `/sign-in`
- **Sign-up URL**: `/sign-up`
- **Home URL**: `/dashboard`
- **After sign-in**: `/dashboard`
- **After sign-up**: `/dashboard`

### 3. Social Connections
- ✅ **Google**: Configuration OAuth
- ✅ **GitHub**: Configuration OAuth (optionnel)

### 4. Email Settings
- ✅ **Email verification**: Activé
- ✅ **Password reset**: Activé avec template custom
- ✅ **Profile change notifications**: Activé

### 5. Webhooks
- **Endpoint**: `https://your-backend.com/webhooks/clerk`
- **Events**: `user.created`, `user.updated`, `user.deleted`
- **Secret**: Générer et copier dans .env

## 📧 Templates Email

### Template Email - Password Reset
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; font-family: 'Inter', Arial, sans-serif; }
        .header { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { padding: 30px; background: #ffffff; }
        .button { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; border-radius: 0 0 12px 12px; }
        .alert { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; color: #b91c1c; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Targetym AI</h1>
            <p style="margin: 0; opacity: 0.9;">Plateforme d'Analytics RH</p>
        </div>
        <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h2>
            <p>Bonjour {{user.first_name}},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte Targetym AI.</p>
            <p><a href="{{reset_url}}" class="button">🔒 Réinitialiser mon mot de passe</a></p>
            <div class="alert">
                <strong>⏰ Important :</strong> Ce lien expire dans 24 heures pour votre sécurité.
            </div>
            <p>Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email en toute sécurité.</p>
            <p>Cordialement,<br>L'équipe Targetym AI</p>
        </div>
        <div class="footer">
            <p>© 2025 Targetym AI - Tous droits réservés</p>
            <p>📧 support@targetym-ai.com | 🌐 www.targetym-ai.com</p>
        </div>
    </div>
</body>
</html>
```

### Template Email - Profil Modifié
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; font-family: 'Inter', Arial, sans-serif; }
        .header { background: linear-gradient(135deg, #10B981, #047857); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { padding: 30px; background: #ffffff; }
        .info-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; border-radius: 0 0 12px 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Profil mis à jour</h1>
            <p style="margin: 0; opacity: 0.9;">Targetym AI</p>
        </div>
        <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Vos informations ont été modifiées</h2>
            <p>Bonjour {{user.first_name}},</p>
            <p>Nous vous confirmons que votre profil Targetym AI a été mis à jour avec succès.</p>
            
            <div class="info-box">
                <h3 style="color: #059669; margin-top: 0;">📋 Modifications effectuées :</h3>
                <ul style="color: #065f46;">
                    <li>📧 Email : {{user.email}}</li>
                    <li>👤 Nom : {{user.first_name}} {{user.last_name}}</li>
                    <li>⏰ Date : {{updated_at}}</li>
                </ul>
            </div>
            
            <p>Si vous n'êtes pas à l'origine de ces modifications, contactez immédiatement notre support.</p>
            <p><a href="mailto:support@targetym-ai.com" style="color: #3B82F6; text-decoration: none;">📞 Contacter le support</a></p>
            
            <p>Cordialement,<br>L'équipe Targetym AI</p>
        </div>
        <div class="footer">
            <p>© 2025 Targetym AI - Tous droits réservés</p>
            <p>📧 support@targetym-ai.com | 🌐 www.targetym-ai.com</p>
        </div>
    </div>
</body>
</html>
```

## 🔗 Liens utiles
- **Dashboard Clerk**: https://dashboard.clerk.dev
- **Documentation**: https://clerk.com/docs/nextjs
- **Webhooks Guide**: https://clerk.com/docs/webhooks
