CREATE TYPE mythgard.accountType as ENUM ('BASIC', 'COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'MYTHIC');

alter table mythgard.account add column account_type mythgard.accountType default 'BASIC';

CREATE POLICY update_account_if_moderator
  ON mythgard.account
  FOR UPDATE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

GRANT UPDATE (account_type) ON TABLE mythgard.account TO authd_user;
