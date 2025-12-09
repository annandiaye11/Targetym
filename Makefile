# Makefile principal pour Targetym AI

.PHONY: dev prod stop install clean help backend frontend full-dev

help: ## Afficher cette aide
	@echo "🎯 Targetym AI - Commandes disponibles:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: full-dev ## Lancer frontend + backend en développement

full-dev: ## Lancer tout en mode développement (recommandé)
	@echo "🚀 Démarrage complet de l'application Targetym AI..."
	@echo ""
	@echo "🔧 Backend: http://localhost:8000"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "📚 API Docs: http://localhost:8000/docs"
	@echo ""
	@echo "Ctrl+C pour arrêter"
	@make -j2 backend frontend

backend: ## Lancer uniquement le backend
	@echo "🔧 Démarrage backend..."
	@cd backend && make dev

frontend: ## Lancer uniquement le frontend
	@echo "🌐 Démarrage frontend..."
	@cd frontend && make dev

prod: ## Lancer en mode production
	@echo "🏭 Démarrage en mode PRODUCTION..."
	@cd backend && make prod &
	@cd frontend && make build && make start

stop: ## Arrêter tous les services
	@echo "🛑 Arrêt de tous les services..."
	@cd backend && make stop
	@pkill -f "next" 2>/dev/null || true
	@echo "✅ Tous les services arrêtés"

install: ## Installer toutes les dépendances
	@echo "📦 Installation des dépendances..."
	@cd backend && make install
	@cd frontend && make install
	@echo "✅ Installation terminée"

clean: ## Nettoyer tous les projets
	@echo "🧹 Nettoyage complet..."
	@cd backend && make clean
	@cd frontend && make clean
	@echo "✅ Nettoyage terminé"

status: ## Vérifier le statut des services
	@echo "📊 Statut des services:"
	@echo -n "Backend (8000): "
	@curl -s http://localhost:8000/health 2>/dev/null && echo "✅ En ligne" || echo "❌ Hors ligne"
	@echo -n "Frontend (3000): "
	@curl -s http://localhost:3000 2>/dev/null >/dev/null && echo "✅ En ligne" || echo "❌ Hors ligne"
