# 🎯 Targetym AI - Plateforme d'Analytics RH

[![GitHub](https://img.shields.io/badge/GitHub-annandiaye11/Targetym-blue)](https://github.com/annandiaye11/Targetym)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-PostgreSQL-green)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

**Targetym AI** est une plateforme complète d'analytics RH développée avec Next.js et FastAPI, conçue pour transformer la gestion des ressources humaines avec l'intelligence artificielle.

## 🌟 Aperçu

Une solution moderne qui combine une interface utilisateur intuitive avec des analyses RH puissantes, offrant aux entreprises les outils nécessaires pour optimiser leurs équipes et prendre des décisions data-driven.

**🔗 Liens utiles:**
- **Repository**: [github.com/annandiaye11/Targetym](https://github.com/annandiaye11/Targetym)
- **Demo Frontend**: `http://localhost:3000` (après installation)
- **API Documentation**: `http://localhost:8000/docs` (après installation)

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- **JWT Authentication** avec tokens sécurisés
- **SHA256 Password Hashing** pour la sécurité
- **Protected Routes** avec middleware de protection
- **Session Management** avec React Context

### 📊 Interface Utilisateur
- **Dashboard Dynamique** avec navigation conditionnelle
- **Design Responsive** optimisé mobile/desktop
- **UI Moderne** avec Tailwind CSS et Heroicons
- **TypeScript** pour un code robuste et maintenable

### 🚀 Backend & Base de Données
- **API REST** complète avec FastAPI
- **PostgreSQL** pour la persistence des données
- **CORS** configuré pour le développement cross-origin
- **Documentation API** automatique avec Swagger

## 🛠️ Stack Technologique

### Frontend (Next.js 14)

- **Framework**: Next.js 14 avec App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.4
- **Icons**: Heroicons 2.0
- **State Management**: React Context API
- **HTTP Client**: Fetch API native

### Backend (FastAPI)

- **Framework**: FastAPI avec Python 3.11+
- **Database**: PostgreSQL 15+ avec psycopg2
- **Authentication**: JWT avec python-jose
- **Password Security**: SHA256 hashing
- **Server**: Uvicorn ASGI
- **Environment**: python-dotenv pour la configuration

## 📦 Installation Rapide

### Prérequis

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://python.org/))
- **PostgreSQL** 15+ ([Download](https://postgresql.org/))
- **Git** ([Download](https://git-scm.com/))

### 🚀 Installation en 3 étapes

#### 1️⃣ Cloner et configurer

```bash
# Cloner le repository
git clone https://github.com/annandiaye11/Targetym.git
cd Targetym

# Installer toutes les dépendances (frontend + backend)
make install
```

#### 2️⃣ Configurer la base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE targetym_ai;
CREATE USER targetym_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE targetym_ai TO targetym_user;
\q
```

#### 3️⃣ Configurer l'environnement backend

```bash
# Copier le fichier d'environnement
cp backend/.env.example backend/.env

# Éditer les variables d'environnement
nano backend/.env
```

**Contenu du fichier `.env` :**

```env
DATABASE_URL=postgresql://targetym_user:your_secure_password@localhost:5432/targetym_ai
SECRET_KEY=your-super-secret-jwt-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🎯 Lancement de l'application

### Option 1: Démarrage complet (Recommandé)

```bash
# Lance frontend + backend simultanément
make dev
```

**Accès après démarrage :**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000  
- 📚 **Documentation API**: http://localhost:8000/docs

### Option 2: Démarrage séparé

```bash
# Terminal 1 - Backend uniquement
make backend

# Terminal 2 - Frontend uniquement  
make frontend
```

### Option 3: Scripts directs

```bash
# Backend avec script bash
cd backend && ./start.sh

# Ou avec options avancées
cd backend && ./run.sh dev
```

## 🎮 Utilisation

### 1️⃣ Créer un compte

1. Aller sur http://localhost:3000
2. Cliquer sur **"S'inscrire"** dans la navigation
3. Remplir le formulaire d'inscription
4. Se connecter avec les identifiants créés

### 2️⃣ Explorer l'application

- **Dashboard** - Interface utilisateur principale (après connexion)
- **Solutions** - Découvrir les fonctionnalités d'analytics RH
- **Cas d'utilisation** - Exemples concrets d'utilisation
- **Tarification** - Plans disponibles (toggle mensuel/annuel)

### 3️⃣ API Testing

Utiliser la documentation interactive : http://localhost:8000/docs

## 📁 Structure du projet

```
Targetym/
├── 📂 frontend/              # Application Next.js
│   ├── 📂 src/
│   │   ├── 📂 app/           # Pages et routes
│   │   ├── 📂 components/    # Composants React  
│   │   └── 📂 contexts/      # Gestion d'état
│   └── 📄 package.json
├── 📂 backend/               # API FastAPI
│   ├── 📄 main_postgresql.py # Application principale
│   ├── 📄 requirements.txt   # Dépendances Python
│   └── 📄 .env              # Configuration
├── 📄 Makefile              # Commandes de gestion
├── 📄 README.md             # Cette documentation
└── 📄 .gitignore            # Fichiers ignorés par Git
```

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera accessible à `http://localhost:3000`

#### 2. Backend (FastAPI)

```bash
cd backend
poetry install
cp .env.example .env
# Configurer les variables d'environnement dans .env
poetry run uvicorn app.main:app --reload
```

Le backend sera accessible à `http://localhost:8000`

### Variables d'Environnement

#### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/targetym_ai
SECRET_KEY=your-super-secret-key
RESEND_API_KEY=re_your_api_key
REDIS_URL=redis://localhost:6379
```

#### Frontend (automatique via Vercel)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 📁 Structure du Projet

```
targetym-ai/
├── frontend/                 # Application Next.js
│   ├── src/
│   │   ├── app/             # Pages App Router
│   │   ├── components/      # Composants réutilisables
│   │   ├── hooks/           # Hooks personnalisés
│   │   └── lib/             # Utilitaires et configuration
│   ├── public/              # Assets statiques
│   └── package.json
│
├── backend/                  # API FastAPI
│   ├── app/
│   │   ├── api/             # Routes API
│   │   ├── core/            # Configuration et sécurité
│   │   ├── models/          # Modèles SQLAlchemy
│   │   ├── schemas/         # Schémas Pydantic
│   │   └── services/        # Logique métier
│   ├── alembic/             # Migrations de base de données
│   └── pyproject.toml
│
└── README.md                 # Ce fichier
```

## 🌐 Déploiement

### Frontend (Vercel)
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déploiement automatique à chaque push

### Backend (Railway)
1. Connecter le repository à Railway
2. Configurer les variables d'environnement
3. Ajouter une base PostgreSQL
4. Déploiement automatique avec `railway.json`

## 🔧 Commandes Utiles

### Frontend
```bash
npm run dev          # Développement
npm run build        # Build de production
npm run lint         # Linting
```

### Backend
```bash
poetry run uvicorn app.main:app --reload    # Développement
poetry run pytest                          # Tests
poetry run black .                         # Formatage
poetry run alembic upgrade head           # Migrations
```

## 📚 Documentation API

- **Swagger UI** : `http://localhost:8000/docs`
- **ReDoc** : `http://localhost:8000/redoc`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence propriétaire. Tous droits réservés.

## 🎯 Roadmap

- [ ] Intégrations avec SIRH populaires
- [ ] Modèles IA personnalisés
- [ ] Application mobile
- [ ] Marketplace de plugins
- [ ] Conformité GDPR avancée

## 📞 Support

- **Email** : support@targetym.ai
- **Documentation** : [docs.targetym.ai](https://docs.targetym.ai)
- **Status** : [status.targetym.ai](https://status.targetym.ai)

---

**Targetym AI** - Transformez vos RH avec l'analytique people alimentée par l'IA.
