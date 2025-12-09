# 🎯 Targetym AI - Plateforme d'Analytics RH

**Targetym AI** est une plateforme moderne d'analytics RH développée avec Next.js et FastAPI, offrant une analyse intelligente des données de ressources humaines.

## 🚀 Fonctionnalités

- ✅ **Interface moderne** avec Next.js 14 et Tailwind CSS
- ✅ **Authentification sécurisée** avec JWT et SHA256
- ✅ **Base de données PostgreSQL** pour la production
- ✅ **API REST complète** avec FastAPI
- ✅ **Navigation dynamique** selon l'état d'authentification
- ✅ **Dashboard utilisateur** protégé
- ✅ **Responsive design** optimisé mobile

## 🛠️ Technologies

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Heroicons** - Icônes SVG
- **React Context** - Gestion d'état pour l'authentification

### Backend
- **FastAPI** - Framework web Python moderne
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification par tokens
- **SHA256** - Hachage sécurisé des mots de passe
- **Uvicorn** - Serveur ASGI

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework** : Next.js 14 avec App Router
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Composants** : Composants custom avec Heroicons
- **Authentification** : Context API avec hooks personnalisés
- **Déploiement** : Vercel

### Backend (FastAPI)
- **Framework** : FastAPI avec Python 3.11+
- **Base de données** : PostgreSQL avec SQLAlchemy
- **Authentification** : JWT avec python-jose
- **Tâches asynchrones** : Celery + Redis
- **Emails** : Resend API
- **Déploiement** : Railway

## 🛠️ Installation et Développement

### Prérequis

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Redis
- Poetry (pour Python)

### Configuration Rapide

#### 1. Frontend (Next.js)

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
