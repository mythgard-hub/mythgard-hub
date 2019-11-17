CREATE TYPE mythgard.deckArchetype as ENUM ('UNKNOWN', 'AGGRO', 'MIDRANGE', 'CONTROL', 'COMBO');

CREATE TYPE mythgard.deckType as ENUM ('STANDARD', 'GAUNTLET', 'TOURNAMENT');

ALTER TABLE deck
ADD COLUMN archetype mythgard.deckArchetype[] NOT NULL DEFAULT ARRAY['UNKNOWN']::mythgard.deckArchetype[],
ADD COLUMN type mythgard.deckType[] NOT NULL DEFAULT ARRAY['STANDARD']::mythgard.deckType[];

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes,
         deck.archetype as deck_archetype,
         deck.type as deck_type
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
