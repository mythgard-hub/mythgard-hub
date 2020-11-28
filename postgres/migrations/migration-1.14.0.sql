ALTER TABLE mythgard.tournament ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_all ON mythgard.tournament TO admin USING (true) WITH CHECK (true);
CREATE POLICY all_view on mythgard.tournament FOR SELECT USING (true);
CREATE POLICY crud_if_mod on mythgard.tournament
  FOR ALL
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

ALTER TABLE mythgard.tournament_deck ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_all ON mythgard.tournament_deck TO admin USING (true) WITH CHECK (true);
CREATE POLICY all_view on mythgard.tournament_deck FOR SELECT USING (true);
CREATE POLICY crud_if_mod on mythgard.tournament_deck
  FOR ALL
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));
