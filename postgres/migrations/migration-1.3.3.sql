CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         sum(essence_costs.essence * card_deck.quantity)::int as essence_cost,
         count(DISTINCT deck_vote)::int as votes
  FROM mythgard.deck
  JOIN mythgard.card_deck
    ON card_deck.deck_id = deck.id
  JOIN mythgard.card
    ON card_deck.card_id = card.id
  LEFT JOIN mythgard.card_faction
    ON (card.id = card_faction.card_id and card_faction.faction_id is not null)
  LEFT JOIN mythgard.faction
    On faction.id = card_faction.faction_id
  LEFT JOIN mythgard.essence_costs
    On essence_costs.rarity = card.rarity
  LEFT JOIN mythgard.deck_vote
    On deck_vote.deck_id = deck.id
 GROUP BY deck.id
;

ALTER TABLE mythgard.deck_vote ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY deck_vote_admin_all ON mythgard.deck_vote TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_vote_all_view ON mythgard.deck_vote FOR SELECT USING (true);
-- Rows can only be updated by their author
CREATE POLICY deck_vote_insert_if_author
  ON mythgard.deck_vote
  FOR INSERT
  WITH CHECK ("account_id" = mythgard.current_user_id());
CREATE POLICY deck_vote_delete_if_author
  ON mythgard.deck_vote
  FOR DELETE
  USING ("account_id" = mythgard.current_user_id());
