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
