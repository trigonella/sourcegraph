BEGIN;

ALTER TABLE external_services ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE external_services ADD COLUMN IF NOT EXISTS  org_id INTEGER;

UPDATE external_services SET user_id = (SELECT MIN(id) FROM users WHERE site_admin IS TRUE);

-- ALTER TABLE external_services
--     ADD CONSTRAINT external_services_has_1_owner CHECK ((user_id IS NULL) <> (org_id IS NULL));

COMMIT;
