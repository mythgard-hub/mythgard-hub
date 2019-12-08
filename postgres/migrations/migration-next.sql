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

create or replace function mythgard.deck_factions(deckId integer) returns  character varying[] as $$
  select(array_agg(distinct faction.name))
  from mythgard.deck
  left join mythgard.card_deck on card_deck.deck_id = deck.id
  left join mythgard.card on card.id = card_deck.card_id
  left join mythgard.card_faction on card_faction.card_id = card.id
  left join mythgard.faction on faction.id = card_faction.faction_id
  where mythgard.deck.id = deckId
  and faction.name is not null;
$$ language sql stable;

DROP VIEW mythgard.deck_preview;
CREATE VIEW mythgard.deck_preview as
SELECT deck.id as deck_id,
       deck.name as deck_name,
       deck.created as deck_created,
       deck.type as deck_type,
       deck.modified as deck_modified,
       deck.archetype as deck_archetype,
       account.id as account_id,
       account.username as username,
       mythgard.deck_factions(deck.id) as factions,
       mythgard.deck_essence_cost(deck.id)::int as essence_cost,
       mythgard.deck_votes(deck.id)::int as votes,
       mythgard.deck_hotness(deck.id)::int as hotness
FROM mythgard.deck
LEFT JOIN mythgard.account
ON mythgard.account.id = mythgard.deck.author_id;

comment on view mythgard.deck_preview is E'@foreignKey (deck_id) references mythgard.deck';

GRANT SELECT ON TABLE mythgard.deck_preview TO admin, authd_user, anon_user;

