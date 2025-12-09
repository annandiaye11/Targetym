# Makefile pour Targetym AI Backend

.PHONY: dev prod stop install clean help

# Variables
VENV = ../.venv
PYTHON = $(VENV)/bin/python
UVICORN = $(VENV)/bin/uvicorn

help: ## Afficher cette aide
	@echo "🎯 Commandes disponibles pour Targetym AI Backend:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

dev: ## Lancer en mode développement avec auto-reload
	@echo "🚀 Démarrage backend en mode DÉVELOPPEMENT..."
	@echo "📍 http://localhost:8000 | 📚 http://localhost:8000/docs"
	@cd $(dir $(realpath $(firstword $(MAKEFILE_LIST)))) && \
	$(UVICORN) main_postgresql:app --reload --host 0.0.0.0 --port 8000

prod: ## Lancer en mode production
	@echo "🏭 Démarrage backend en mode PRODUCTION..."
	@echo "📍 http://localhost:8000"
	@cd $(dir $(realpath $(firstword $(MAKEFILE_LIST)))) && \
	$(UVICORN) main_postgresql:app --host 0.0.0.0 --port 8000 --workers 4

stop: ## Arrêter le backend
	@echo "🛑 Arrêt du backend..."
	@pkill -f "main_postgresql" 2>/dev/null || true
	@pkill -f "uvicorn.*main_postgresql" 2>/dev/null || true
	@echo "✅ Backend arrêté"

install: ## Installer les dépendances
	@echo "📦 Installation des dépendances..."
	@$(VENV)/bin/pip install -r requirements.txt

clean: ## Nettoyer les fichiers temporaires
	@echo "🧹 Nettoyage..."
	@find . -type f -name "*.pyc" -delete
	@find . -type d -name "__pycache__" -delete

logs: ## Afficher les logs en temps réel (si en arrière-plan)
	@echo "📋 Logs du backend:"
	@tail -f /tmp/targetym-backend.log 2>/dev/null || echo "Aucun log trouvé"
