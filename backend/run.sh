#!/bin/bash

# Script avancé pour lancer le backend Targetym AI
# Usage: ./run.sh [dev|prod|stop]

cd "$(dirname "$0")"

case "$1" in
    "dev"|"")
        echo "🚀 Démarrage en mode DÉVELOPPEMENT..."
        echo "📍 Backend: http://localhost:8000"
        echo "📚 API Docs: http://localhost:8000/docs"
        echo "🔄 Auto-reload activé"
        echo ""
        source ../.venv/bin/activate
        uvicorn main_postgresql:app --reload --host 0.0.0.0 --port 8000
        ;;
    "prod")
        echo "🏭 Démarrage en mode PRODUCTION..."
        echo "📍 Backend: http://localhost:8000"
        echo ""
        source ../.venv/bin/activate
        uvicorn main_postgresql:app --host 0.0.0.0 --port 8000 --workers 4
        ;;
    "stop")
        echo "🛑 Arrêt du backend..."
        pkill -f "main_postgresql"
        pkill -f "uvicorn.*main_postgresql"
        echo "✅ Backend arrêté"
        ;;
    *)
        echo "Usage: $0 [dev|prod|stop]"
        echo "  dev  - Mode développement avec auto-reload (défaut)"
        echo "  prod - Mode production avec plusieurs workers"
        echo "  stop - Arrêter le backend"
        ;;
esac
