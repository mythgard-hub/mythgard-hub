CREATE TYPE mythgard.accountType as ENUM ('BASIC', 'COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'MYTHIC');

alter table mythgard.account add column account_type mythgard.accountType default 'BASIC';
alter table mythgard.account add column profile_icon_id integer default 1;

CREATE POLICY update_account_if_moderator
  ON mythgard.account
  FOR UPDATE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

GRANT UPDATE (account_type, profile_icon_id) ON TABLE mythgard.account TO authd_user;
GRANT SELECT (id, username, account_type, registered, profile_icon_id) ON TABLE mythgard.account TO anon_user;
