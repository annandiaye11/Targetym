#!/bin/bash

echo "🧪 Test complet de Targetym AI avec Clerk"
echo "========================================"
echo ""

# Test 1: Page d'accueil
echo "🏠 Test 1: Page d'accueil..."
curl -s -o /dev/null -w "Status: %{http_code}" http://localhost:3000
echo ""

# Test 2: Page de connexion
echo "🔐 Test 2: Page de connexion..."
curl -s -o /dev/null -w "Status: %{http_code}" http://localhost:3000/sign-in
echo ""

# Test 3: Page d'inscription
echo "📝 Test 3: Page d'inscription..."
curl -s -o /dev/null -w "Status: %{http_code}" http://localhost:3000/sign-up
echo ""

# Test 4: Dashboard (protégé)
echo "📊 Test 4: Dashboard..."
curl -s -o /dev/null -w "Status: %{http_code}" http://localhost:3000/dashboard
echo ""

# Test 5: API Backend
echo "🔧 Test 5: Backend API..."
curl -s -o /dev/null -w "Status: %{http_code}" http://localhost:8000
echo ""

echo ""
echo "✅ Tous les tests terminés !"
echo ""
echo "🔗 Liens pour tester manuellement :"
echo "   🏠 Accueil:     http://localhost:3000"
echo "   🔐 Connexion:   http://localhost:3000/sign-in"  
echo "   📝 Inscription: http://localhost:3000/sign-up"
echo "   📊 Dashboard:   http://localhost:3000/dashboard"
echo "   👤 Profil:      http://localhost:3000/profile"
echo ""
echo "🎯 Test Google OAuth :"
echo "   1. Va sur http://localhost:3000/sign-in"
echo "   2. Clique 'Continue with Google'"
echo "   3. Authentifie-toi avec Google"
echo "   4. Tu seras redirigé vers le dashboard !"
