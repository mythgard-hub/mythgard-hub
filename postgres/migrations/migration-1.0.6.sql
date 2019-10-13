ALTER TABLE mythgard.card_deck ENABLE ROW LEVEL SECURITY;
-- Admin users can make any changes and read all rows
CREATE POLICY card_deck_admin_all ON mythgard.card_deck TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY card_deck_all_view ON mythgard.card_deck FOR SELECT USING (true);
-- Only create a card_deck for yourself
CREATE POLICY card_deck_insert_if_author
  ON mythgard.card_deck
  FOR INSERT
    -- make sure deck.author equals mythgard.current_user_id
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be updated by their author
CREATE POLICY card_deck_update_if_author
  ON mythgard.card_deck
  FOR UPDATE
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be deleted by their author
CREATE POLICY card_deck_delete_if_author
  ON mythgard.card_deck
  FOR DELETE
  USING (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));

CREATE OR REPLACE FUNCTION mythgard.update_deck_and_remove_cards
(
  _id integer,
  _name varchar(255),
  _path_id integer,
  _power_id integer
)
RETURNS mythgard.deck as $$
  DELETE FROM mythgard.card_deck
    WHERE deck_id = _id;
  UPDATE mythgard.deck
    SET name = _name,
        path_id = _path_id,
        power_id = _power_id
    WHERE id = _id
    RETURNING *
$$ LANGUAGE sql VOLATILE;

