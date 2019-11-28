CREATE TABLE mythgard.site_config (
  id SERIAL PRIMARY KEY,
  config jsonb
);

INSERT INTO mythgard.site_config (config) values ('{}');

ALTER TABLE mythgard.site_config ENABLE ROW LEVEL SECURITY;


GRANT SELECT ON TABLE mythgard.site_config TO admin, authd_user, anon_user;
GRANT UPDATE (config) ON TABLE mythgard.site_config TO authd_user;

CREATE POLICY update_site_config_if_moderator
  ON mythgard.site_config
  FOR UPDATE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

CREATE POLICY site_config_all_view ON mythgard.site_config FOR SELECT USING (true);
