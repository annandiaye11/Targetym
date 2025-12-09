# Configuration pgAdmin4 pour Targetym AI

## 1. Lancer pgAdmin4
- Ouvre pgAdmin4 depuis le menu applications
- Ou lance depuis terminal : `pgadmin4`

## 2. Ajouter le serveur PostgreSQL

**Étape 1 : Créer une nouvelle connexion**
1. Clic droit sur "Servers" → "Create" → "Server..."

**Étape 2 : Onglet "General"**
- Name: `Targetym AI Local`
- Comment: `Base de données locale pour Targetym AI`

**Étape 3 : Onglet "Connection"**
- Host name/address: `localhost`
- Port: `5432`
- Maintenance database: `postgres`
- Username: `postgres`
- Password: [mot de passe postgres configuré lors de l'installation]
- Save password: ✅ Coché

**Étape 4 : Sauvegarder**
- Cliquer "Save"

## 3. Naviguer vers la base Targetym AI

Une fois connecté :
1. **Servers** → **Targetym AI Local** → **Databases** → **targetym_ai**
2. **Schemas** → **public** → **Tables** → **users**

## 4. Requêtes utiles dans pgAdmin4

**Voir tous les utilisateurs :**
```sql
SELECT 
    id, 
    email, 
    first_name, 
    last_name, 
    company, 
    is_active, 
    created_at 
FROM users 
ORDER BY created_at DESC;
```

**Compter les utilisateurs :**
```sql
SELECT COUNT(*) as total_users FROM users;
```

**Voir les utilisateurs actifs :**
```sql
SELECT * FROM users WHERE is_active = TRUE;
```

**Structure de la table :**
```sql
\d users;
```

## 5. Configuration des permissions

**Donner tous les privilèges à targetym_user :**
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO targetym_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO targetym_user;
```

## 6. Sauvegarde et restauration

**Sauvegarde :**
```bash
pg_dump -h localhost -U targetym_user targetym_ai > backup_targetym.sql
```

**Restauration :**
```bash
psql -h localhost -U targetym_user targetym_ai < backup_targetym.sql
```

## 7. Surveillance des connexions

**Voir les connexions actives :**
```sql
SELECT 
    datname as database,
    usename as username,
    application_name,
    client_addr,
    state,
    query_start
FROM pg_stat_activity 
WHERE datname = 'targetym_ai';
```

## Notes importantes

- **Port par défaut** : PostgreSQL utilise le port 5432
- **Utilisateur admin** : `postgres`
- **Utilisateur application** : `targetym_user`
- **Base de données** : `targetym_ai`
- **Schema** : `public` (par défaut)

La base PostgreSQL est maintenant configurée et accessible via pgAdmin4 !
