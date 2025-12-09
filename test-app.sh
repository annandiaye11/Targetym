#!/bin/bash

# 🧪 Script de test pour Targetym AI

echo "🎯 Test de l'application Targetym AI"
echo "=================================="
echo ""

# Test 1: Vérifier que le backend répond
echo "📡 Test 1: Backend API Health Check..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Backend accessible sur http://localhost:8000"
else
    echo "❌ Backend inaccessible"
    exit 1
fi

# Test 2: Vérifier la documentation API
echo ""
echo "📚 Test 2: API Documentation..."
if curl -s http://localhost:8000/docs | grep -q "Swagger"; then
    echo "✅ Documentation API accessible sur http://localhost:8000/docs"
else
    echo "❌ Documentation API inaccessible"
fi

# Test 3: Vérifier que le frontend répond
echo ""
echo "🌐 Test 3: Frontend Health Check..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend accessible sur http://localhost:3000"
else
    echo "❌ Frontend inaccessible"
    exit 1
fi

# Test 4: Tester l'endpoint webhook
echo ""
echo "🔗 Test 4: Webhook Endpoint..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/webhooks/clerk | grep -q "405"; then
    echo "✅ Endpoint webhook Clerk configuré (405 = méthode non autorisée, normal pour GET)"
else
    echo "⚠️  Endpoint webhook pourrait ne pas être configuré correctement"
fi

echo ""
echo "🎉 Tests terminés !"
echo ""
echo "🔗 Liens utiles:"
echo "   Frontend:        http://localhost:3000"
echo "   Backend API:     http://localhost:8000"
echo "   API Docs:        http://localhost:8000/docs"
echo ""
echo "Pour arrêter l'application: Ctrl+C dans le terminal ou 'make stop'"
