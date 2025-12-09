# 🚀 Guide pour obtenir les clés Clerk

## Étape 1: Créer un compte Clerk

1. Va sur https://dashboard.clerk.com/
2. Clique sur "Sign up" (ou "Get started")
3. Crée ton compte avec ton email

## Étape 2: Créer une nouvelle application

1. Une fois connecté, clique sur "Add application" 
2. Donne un nom à ton app : "Targetym AI"
3. Choisis les méthodes de connexion que tu veux :
   - ✅ Email + Password (recommandé pour commencer)
   - ✅ Google (optionnel)
   - ✅ GitHub (optionnel)

## Étape 3: Récupérer tes clés

1. Une fois l'app créée, va dans "API Keys" dans la sidebar gauche
2. Tu verras :
   - **Publishable key** (commence par `pk_test_...`)
   - **Secret key** (commence par `sk_test_...` - clique sur "Reveal" pour la voir)

## Étape 4: Configurer les webhooks (optionnel pour commencer)

1. Va dans "Webhooks" dans la sidebar
2. Clique "Add Endpoint"  
3. URL: `http://localhost:8000/webhooks/clerk`
4. Événements : user.created, user.updated, user.deleted
5. Récupère la "Signing Secret" (commence par `whsec_...`)

## Étape 5: Mettre à jour tes fichiers .env

Remplace dans `/home/anna/targetym-ai/frontend/.env.local` :

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ta_vraie_cle_ici
CLERK_SECRET_KEY=sk_test_ta_vraie_cle_ici
CLERK_WEBHOOK_SECRET=whsec_ta_vraie_cle_ici
```

## 🎉 C'est tout !

Une fois les vraies clés en place, l'application fonctionnera parfaitement.

⚠️ **Important**: Garde tes clés secrètes ! Ne les partage jamais publiquement.
