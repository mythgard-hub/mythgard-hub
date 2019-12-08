--   SELECT deck.id as deck_id,
--          deck.name as deck_name,
--          deck.created as deck_created,
--          mythgard.deck_factions(deck.id) as factions,
--          mythgard.deck_essence_cost(deck.id)::int as essence_cost,
--          mythgard.deck_votes(deck.id)::int as votes,
--          deck.archetype as deck_archetype,
--          deck.type as deck_type
--   FROM mythgard.deck
--   JOIN mythgard.card_deck
--     ON card_deck.deck_id = deck.id
--   JOIN mythgard.card
--     ON card_deck.card_id = card.id
--  GROUP BY deck.id


create function mythgard.deck_factions(deckId integer) returns  character varying[] as $$
  select(array_agg(distinct faction.name))
  from mythgard.deck
  left join mythgard.card_deck on card_deck.deck_id = deck.id
  left join mythgard.card on card.id = card_deck.card_id
  left join mythgard.card_faction on card_faction.card_id = card.id
  left join mythgard.faction on faction.id = card_faction.faction_id
  where deck.id = deckId
  and faction.name is not null;
$$ language sql stable;

CREATE OR REPLACE VIEW mythgard.deck_preview as
SELECT deck.id as deck_id,
       deck.name as deck_name,
       deck.created as deck_created,
       mythgard.deck_factions(deck.id) as factions,
       mythgard.deck_essence_cost(deck.id)::int as essence_cost,
       mythgard.deck_votes(deck.id)::int as votes,
       deck.archetype as deck_archetype,
       deck.type as deck_type,
       mythgard.deck_hotness(deck.id)::int as hotness,
       account.id as account_id,
       account.username as username
FROM mythgard.deck
LEFT JOIN mythgard.account
ON account.id = deck.author_id;
