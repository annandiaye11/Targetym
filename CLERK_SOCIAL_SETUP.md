# 🔧 Configuration des connexions sociales Clerk

## Pourquoi Google/GitHub ne fonctionnent pas ?

Les boutons Google et GitHub ne fonctionnent pas car ils ne sont pas encore configurés dans ton dashboard Clerk. Voici comment les activer :

## 📋 Étapes à suivre :

### 1. Accéder aux paramètres
1. Va sur https://dashboard.clerk.com/
2. Sélectionne ton application "Targetym AI"
3. Va dans **"User & Authentication"** > **"Social Connections"**

### 2. Configurer Google OAuth
1. Clique sur **"Add social connection"**
2. Sélectionne **"Google"**
3. Tu auras besoin de :
   - **Client ID Google**
   - **Client Secret Google**

**Pour obtenir ces clés Google :**
- Va sur [Google Cloud Console](https://console.cloud.google.com/)
- Crée un projet ou sélectionne un projet existant
- Active l'API "Google+ API"
- Va dans "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
- Configure les URLs autorisées :
  - **JavaScript origins**: `https://rare-burro-21.clerk.accounts.dev`
  - **Redirect URIs**: `https://rare-burro-21.clerk.accounts.dev/v1/oauth_callback`

### 3. Configurer GitHub OAuth
1. Dans Clerk, clique sur **"Add social connection"**
2. Sélectionne **"GitHub"**
3. Tu auras besoin de :
   - **Client ID GitHub**
   - **Client Secret GitHub**

**Pour obtenir ces clés GitHub :**
- Va sur [GitHub Settings](https://github.com/settings/developers)
- Clique "New OAuth App"
- Configure :
  - **Application name**: "Targetym AI"
  - **Homepage URL**: `http://localhost:3000`
  - **Authorization callback URL**: `https://rare-burro-21.clerk.accounts.dev/v1/oauth_callback`

### 4. Configuration pour le développement local

Pour tester en local, dans Clerk :
1. Va dans **"Domains"**
2. Ajoute `localhost:3000` aux domaines autorisés

## 🎯 Alternative simple pour tester

Si tu veux tester rapidement sans configurer Google/GitHub :
- Désactive temporairement ces options dans Clerk
- Utilise seulement "Email + Password" pour commencer
- Tu pourras ajouter les connexions sociales plus tard

## ✅ Une fois configuré

Les boutons Google et GitHub fonctionneront automatiquement sur ton application !
