#!/bin/bash

# Script pour lancer le backend Targetym AI avec PostgreSQL
echo "🚀 Démarrage du backend Targetym AI..."
echo "📍 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""

cd "$(dirname "$0")"
source ../.venv/bin/activate
python main_postgresql.py
