# Makefile pour Targetym AI Frontend

.PHONY: dev build start install clean help

# Variables
NODE_BIN = node_modules/.bin

help: ## Afficher cette aide
	@echo "🎯 Commandes disponibles pour Targetym AI Frontend:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

dev: ## Lancer en mode développement
	@echo "🚀 Démarrage frontend en mode DÉVELOPPEMENT..."
	@echo "📍 http://localhost:3000"
	@npm run dev

build: ## Construire pour la production
	@echo "🏗️  Construction pour la production..."
	@npm run build

start: ## Démarrer en mode production
	@echo "🏭 Démarrage frontend en mode PRODUCTION..."
	@echo "📍 http://localhost:3000"
	@npm run start

install: ## Installer les dépendances
	@echo "📦 Installation des dépendances..."
	@npm install

clean: ## Nettoyer les fichiers de build
	@echo "🧹 Nettoyage..."
	@rm -rf .next
	@rm -rf node_modules/.cache
