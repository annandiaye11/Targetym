-- Migration pour ajouter le support de Clerk aux utilisateurs existants

-- Ajouter les colonnes nécessaires pour Clerk
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS clerk_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at sur les modifications
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Commentaires pour documenter les colonnes
COMMENT ON COLUMN users.clerk_id IS 'Identifiant unique depuis Clerk Auth';
COMMENT ON COLUMN users.first_name IS 'Prénom utilisateur';
COMMENT ON COLUMN users.last_name IS 'Nom de famille utilisateur';
COMMENT ON COLUMN users.is_active IS 'Statut actif (pour soft delete)';
COMMENT ON COLUMN users.deleted_at IS 'Date de suppression (soft delete)';
COMMENT ON COLUMN users.updated_at IS 'Date dernière modification';

-- Vérifier la structure finale
\d users;
