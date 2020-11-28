CREATE TABLE mythgard.deck_favorite (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  account_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE,
  UNIQUE(deck_id, account_id)
);

INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (6, 1);
INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (7, 1);
INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (8, 1);
INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (9, 1);
INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (10, 1);
INSERT INTO mythgard.deck_favorite("deck_id", "account_id") VALUES (11, 1);

ALTER TABLE mythgard.deck_favorite ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY deck_favorite_admin_all ON mythgard.deck_favorite TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_favorite_all_view ON mythgard.deck_favorite FOR SELECT USING (true);
-- Rows can only be updated by their author
-- and users cannot create a row for their own decks
CREATE POLICY deck_favorite_insert_if_author
  ON mythgard.deck_favorite
  FOR INSERT
  WITH CHECK ((account_id = mythgard.current_user_id())
              AND
              NOT EXISTS(select * from mythgard.deck
                         where id = deck_favorite.deck_id
                         and author_id = mythgard.current_user_id()));
CREATE POLICY deck_favorite_delete_if_author
  ON mythgard.deck_favorite
  FOR DELETE
  USING ("account_id" = mythgard.current_user_id());