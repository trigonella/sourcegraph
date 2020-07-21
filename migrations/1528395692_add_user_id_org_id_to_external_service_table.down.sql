BEGIN;

-- ALTER TABLE external_services DROP CONSTRAINT external_services_has_1_owner;
ALTER TABLE external_services DROP COLUMN user_id;
ALTER TABLE external_services DROP COLUMN org_id;

COMMIT;
