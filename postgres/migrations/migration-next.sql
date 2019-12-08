drop function if exists mythgard.epochSeconds;
create function mythgard.epochSeconds(timestamp) returns int as $$
  select extract(epoch from $1)::int;
$$ language sql stable;

drop function if exists mythgard.hotnessOrder;
create function mythgard.hotnessOrder(votes integer) returns integer as $$
  select greatest(votes, 1);
$$ language sql stable;

drop function if exists mythgard.hotnessSign;
create function mythgard.hotnessSign(votes integer) returns integer as $$
  select(case when votes > 0 then 1 else 0 end);
$$ language sql stable;

drop function if exists mythgard.hotnessSeconds;
create function mythgard.hotnessSeconds(creation timestamp) returns integer as $$
  select(mythgard.epochSeconds(creation) - 1134028003);
$$ language sql stable;

drop function if exists mythgard.hotness;
create function mythgard.hotness(votes integer, creation timestamp) returns double precision as $$

  select round(
    ((mythgard.hotnessSign(votes) * mythgard.hotnessOrder(votes))
      + (mythgard.hotnessSeconds(creation) / 180000))::numeric
  , 7)::double precision;

$$ language sql stable;

drop function if exists mythgard.deckHotness;
create function mythgard.deckHotness(deckId integer) returns double precision as $$

  select mythgard.hotness(mythgard.deck_votes(deckId), created)
  from mythgard.deck
  where deck.id = deckId;

$$ language sql stable;

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes,
         deck.archetype as deck_archetype,
         deck.type as deck_type,
         mythgard.deckHotness(deck.id) as deck_hotness
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
