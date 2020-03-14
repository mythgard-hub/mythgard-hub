ALTER TABLE mythgard.deck_featured ENABLE ROW LEVEL SECURITY;

CREATE POLICY deck_featured_all_view ON mythgard.deck_featured FOR SELECT USING (true);

CREATE POLICY delete_deck_featured_moderator
  ON mythgard.deck_featured
  FOR DELETE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

