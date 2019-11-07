CREATE OR REPLACE FUNCTION deck_votes (IN deckId INTEGER) 
RETURNS INTEGER AS $$
  DECLARE
    votes INTEGER;
  BEGIN
    SELECT count(DISTINCT deck_vote)::int into votes
    FROM mythgard.deck
   LEFT JOIN mythgard.deck_vote
     On deck_vote.deck_id = deck.id
   WHERE deck.id = $1
   GROUP BY deck.id;
    
    RETURN votes;
  END;
  $$ language 'plpgsql';

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         deck_essence_cost(deck.id)::int as essence_cost,
         deck_votes(deck.id)::int as votes
  FROM mythgard.deck
  JOIN mythgard.card_deck
    ON card_deck.deck_id = deck.id
  JOIN mythgard.card
    ON card_deck.card_id = card.id
  LEFT JOIN mythgard.card_faction
    ON (card.id = card_faction.card_id and card_faction.faction_id is not null)
  LEFT JOIN mythgard.faction
    On faction.id = card_faction.faction_id
 GROUP BY deck.id
;
