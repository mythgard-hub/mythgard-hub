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
create function mythgard.deck_hotness(deckId integer) returns double precision as $$

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
CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         mythgard.deck_factions(deck.id) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes,
         deck.archetype as deck_archetype,
         deck.type as deck_type,
         deck.modified as deck_modified,
         account.id as account_id,
         account.username as username,
         mythgard.deck_hotness(deck.id)::int as hotness
  FROM mythgard.deck
  LEFT JOIN mythgard.account
  ON mythgard.account.id = mythgard.deck.author_id
;

comment on view mythgard.deck_preview is E'@foreignKey (deck_id) references mythgard.deck';

GRANT SELECT ON TABLE mythgard.deck_preview TO admin, authd_user, anon_user;

create or replace function mythgard.search_decks(
  deckName varchar(255),
  authorName varchar(255),
  deckModified date,
  card1 integer,
  card2 Integer,
  card3 Integer,
  card4 Integer,
  card5 Integer,
  faction1 integer,
  faction2 integer,
  faction3 integer,
  faction4 integer,
  faction5 integer,
  faction6 integer,
  numFactions integer,
  archetypeFilter mythgard.deckArchetype[],
  typeFilter mythgard.deckType[],
  sortBy text)
  returns setof mythgard.deck as $$

  BEGIN
       IF sortBy = 'essenceDesc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec desc nulls last) as bar;
       ELSIF sortBy = 'essenceAsc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec asc nulls last) as bar;
       ELSIF sortBy = 'ratingDesc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount desc nulls last;
       ELSIF sortBy = 'ratingAsc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount asc nulls first;
       ELSIF sortBy = 'nameAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) asc;
       ELSIF sortBy = 'nameDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) desc;
       ELSIF sortBy = 'dateDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created desc;
       ELSIF sortBy = 'dateAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created asc;
       ELSIF sortBy = 'hot' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by mythgard.deck_hotness(id) desc;
       ELSE
          RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter);
       END IF;
       RETURN;
   END

  $$ language plpgsql stable;
