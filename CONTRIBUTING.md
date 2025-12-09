# 🤝 Guide de Contribution - Targetym AI

Merci de votre intérêt pour contribuer à **Targetym AI** ! Ce guide vous aidera à commencer.

## 🚀 Setup de Développement

### Prérequis
- Node.js 18+
- Python 3.11+  
- PostgreSQL 15+
- Git

### Installation

```bash
# 1. Fork le repository sur GitHub
# 2. Cloner votre fork
git clone https://github.com/VOTRE_USERNAME/Targetym.git
cd Targetym

# 3. Ajouter le repository original
git remote add upstream https://github.com/annandiaye11/Targetym.git

# 4. Installer les dépendances
make install

# 5. Configurer la base de données (voir README.md)
# 6. Lancer en mode développement
make dev
```

## 🔄 Workflow de Contribution

### 1. Avant de commencer

```bash
# Synchroniser avec la branche principale
git checkout main
git pull upstream main
git push origin main
```

### 2. Créer une branche

```bash
# Créer une branche descriptive
git checkout -b feature/nom-de-votre-feature
# ou
git checkout -b fix/description-du-bug
```

### 3. Développer

- ✅ Écrire du code propre et documenté
- ✅ Suivre les conventions de nommage
- ✅ Tester localement avec `make dev`
- ✅ Ajouter des tests si nécessaire

### 4. Commit et Push

```bash
# Ajouter vos modifications
git add .

# Commit avec un message descriptif
git commit -m "✨ feat: ajouter authentification Google OAuth"

# Pousser vers votre fork
git push origin feature/nom-de-votre-feature
```

### 5. Pull Request

1. Aller sur GitHub
2. Ouvrir une Pull Request depuis votre branche
3. Remplir le template de PR
4. Attendre la review

## 📏 Standards de Code

### Frontend (TypeScript/React)

```typescript
// ✅ Bon
interface UserProps {
  id: string;
  name: string;
  email: string;
}

const UserComponent: React.FC<UserProps> = ({ id, name, email }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
    </div>
  );
};

// ❌ Éviter
const user = (props) => {
  return <div>{props.name}</div>
}
```

### Backend (Python/FastAPI)

```python
# ✅ Bon
from typing import List, Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

@router.post("/users/", response_model=User)
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
) -> User:
    """Create a new user."""
    return crud.create_user(db=db, user=user)

# ❌ Éviter  
def create_user(user, db):
    return db.add(user)
```

## 🎯 Types de Contributions

### 🐛 Bug Reports

```markdown
**Description du bug**
Description claire du problème

**Reproduction**
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer

**Screenshots**
Si applicable

**Environnement**
- OS: [e.g. Ubuntu 22.04]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

### ✨ Feature Requests

```markdown
**Problème résolu**
Quel problème cette feature résout-elle ?

**Solution proposée**
Description de la solution

**Alternatives**
Autres solutions considérées

**Contexte supplémentaire**
Toute autre information utile
```

## 🧪 Tests

### Frontend (Jest/Testing Library)

```bash
cd frontend
npm run test              # Lancer tous les tests
npm run test:watch        # Mode watch
npm run test:coverage     # Avec couverture
```

### Backend (pytest)

```bash
cd backend
pytest                    # Tous les tests
pytest tests/test_auth.py # Tests spécifiques
pytest --cov            # Avec couverture
```

## 📝 Messages de Commit

Utiliser la convention [Conventional Commits](https://conventionalcommits.org/) :

```bash
# Types principaux
feat: ✨ nouvelle fonctionnalité
fix: 🐛 correction de bug
docs: 📚 documentation
style: 💄 formatage code
refactor: ♻️ refactoring
test: 🧪 ajout de tests
chore: 🔧 maintenance

# Exemples
git commit -m "✨ feat(auth): ajouter connexion Google OAuth"
git commit -m "🐛 fix(api): corriger validation email"
git commit -m "📚 docs: mettre à jour guide installation"
git commit -m "🧪 test(user): ajouter tests création utilisateur"
```

## 🏷️ Branches et Tags

### Nommage des branches

```bash
feature/nom-feature        # Nouvelles fonctionnalités
fix/nom-bug               # Corrections de bugs
hotfix/nom-urgent         # Corrections urgentes
docs/nom-documentation    # Documentation
refactor/nom-refactoring  # Refactoring
```

### Tags de version

```bash
v1.0.0    # Version majeure
v1.1.0    # Version mineure  
v1.1.1    # Patch
```

## 🔍 Review Process

### Checklist PR

- [ ] Le code compile sans erreur
- [ ] Les tests passent
- [ ] La documentation est mise à jour
- [ ] Le code suit les conventions
- [ ] Les changements sont testés localement

### Review Guidelines

**Pour les reviewers :**
- 🎯 Se concentrer sur la logique métier
- 🔍 Vérifier la sécurité
- 📖 S'assurer de la lisibilité
- 🧪 Valider les tests
- 💬 Être constructif dans les commentaires

## 🎉 Reconnaissance

Les contributeurs sont reconnus dans :
- 📄 Fichier [CONTRIBUTORS.md](CONTRIBUTORS.md)
- 🏆 Section "Contributors" du README
- 📊 Graphiques GitHub des contributions

## ❓ Questions ?

- 💬 **Discussions** : [GitHub Discussions](https://github.com/annandiaye11/Targetym/discussions)
- 🐛 **Issues** : [GitHub Issues](https://github.com/annandiaye11/Targetym/issues)
- 📧 **Email** : anna.ndiaye@example.com

---

**Merci de contribuer à Targetym AI ! 🎯**
