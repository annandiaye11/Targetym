# 🔐 Configuration OAuth Google pour Targetym AI

## Étape 1: Créer un projet Google Cloud (si pas déjà fait)

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un nouveau projet ou sélectionne un existant
3. Nomme-le "Targetym AI" ou similaire

## Étape 2: Activer l'API Google OAuth

1. Dans le menu de gauche, va à "APIs & Services" > "Library"
2. Cherche "Google+ API" ou "People API" 
3. Clique dessus et active l'API

## Étape 3: Configurer l'écran de consentement OAuth

1. Va à "APIs & Services" > "OAuth consent screen"
2. Choisis "External" (sauf si tu as un workspace Google)
3. Remplis les informations :
   - **App name**: Targetym AI
   - **User support email**: ton email
   - **Developer contact info**: ton email
   - **App domain**: http://localhost:3000 (pour dev)

## Étape 4: Créer les identifiants OAuth

1. Va à "APIs & Services" > "Credentials"
2. Clique "Create Credentials" > "OAuth 2.0 Client IDs"
3. Type d'application: **Application Web**
4. Nom: "Targetym AI Web Client"
5. **URLs autorisées** (IMPORTANT):

### Pour le développement local:
```
Origines JavaScript autorisées:
- http://localhost:3000
- http://127.0.0.1:3000

URI de redirection autorisées:
- http://localhost:3000
- https://accounts.clerk.dev/oauth/callback
```

### Pour la production (quand tu déploieras):
```
Origines JavaScript autorisées:
- https://ton-domaine.com

URI de redirection autorisées:
- https://ton-domaine.com
- https://accounts.clerk.dev/oauth/callback
```

## Étape 5: Récupérer tes identifiants

Après création, tu obtiendras:
- **Client ID**: commence par quelque chose comme `123456789-abc.apps.googleusercontent.com`
- **Client Secret**: une chaîne secrète

## Étape 6: Configurer dans Clerk Dashboard

1. Va dans ton Clerk Dashboard
2. Onglet "User & Authentication" > "Social Connections" 
3. Active "Google"
4. Colle ton **Client ID** et **Client Secret**
5. Sauvegarde

## 🎯 Points importants:

- ✅ L'URL de callback Clerk est toujours: `https://accounts.clerk.dev/oauth/callback`
- ✅ Pour le dev local, utilise `http://localhost:3000`
- ✅ Pour la prod, utilise ton vrai domaine HTTPS
- ⚠️ Ne partage jamais ton Client Secret publiquement

Une fois configuré, le bouton "Se connecter avec Google" fonctionnera ! 🚀
