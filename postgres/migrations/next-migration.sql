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
         account.account_type as account_type,
         account.profile_icon_id as profile_icon_id,
         mythgard.deck_hotness(deck.id)::int as hotness,
         deck_views.views::int as views,
         path.name as path_name,
         power.name as power_name
  FROM mythgard.deck
  LEFT JOIN mythgard.account
  ON mythgard.account.id = mythgard.deck.author_id
  LEFT JOIN mythgard.deck_views
  ON mythgard.deck_views.deck_id = mythgard.deck.id
  LEFT JOIN mythgard.path
  ON mythgard.path.id = mythgard.deck.path_id
  LEFT JOIN mythgard.power
  ON mythgard.power.id = mythgard.deck.power_id
;

drop function mythgard.search_decks_nosort;

create or replace function mythgard.search_decks_nosort(
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
  pathName varchar(255),
  powerName varchar(255))
  returns setof mythgard.deck as $$

    SELECT deck.* FROM mythgard.deck
      LEFT JOIN mythgard.card_deck ON (card_deck.deck_id = deck.id)
      LEFT JOIN mythgard.card ON (card.id = card_deck.card_id)
      LEFT JOIN mythgard.account ON (account.id = deck.author_id)
      LEFT JOIN mythgard.path ON (path.id = deck.path_id)
      LEFT JOIN mythgard.power ON (power.id = deck.power_id)

    -- deck name filter
    WHERE (deckName is NULL or trim(deckName) = '' or to_tsvector('simple', deck.name) @@ to_tsquery('simple', replace(regexp_replace(trim(deckName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- author name filter
    AND (authorName is NULL or trim(authorName) = '' or to_tsvector('simple', account.username) @@ to_tsquery('simple', replace(regexp_replace(trim(authorName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- modification date filter
    AND (deckModified is NULL or deck.modified >= deckModified)
    -- archetype filter
    AND (archetypeFilter is NULL or deck.archetype = archetypeFilter)
    -- type filter
    AND (typeFilter is NULL or deck.type = typeFilter)
    -- path filter
    AND (pathName is NULL or path.name = pathName)
    -- power filter
    AND (powerName is NULL or power.name = powerName)

    intersect

    -- cards filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card1 is null or card.id = card1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card2 is null or card.id = card2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card3 is null or card.id = card3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card4 is null or card.id = card4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card5 is null or card.id = card5

    intersect

    -- factions filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    group by deck.id
    having numFactions is NULL or numFactions = 0 or count(distinct faction.id) = numFactions
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction1 is null or faction.id = faction1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction2 is null or faction.id = faction2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction3 is null or faction.id = faction3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction4 is null or faction.id = faction4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction5 is null or faction.id = faction5
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction6 is null or faction.id = faction6

    GROUP BY deck.id
    LIMIT 2000;
  $$ language sql stable;

drop function mythgard.search_decks;

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
  pathName varchar(255),
  powerName varchar(255),
  sortBy text)
  returns setof mythgard.deck as $$

  BEGIN
       IF sortBy = 'essenceDesc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec desc nulls last) as bar;
       ELSIF sortBy = 'essenceAsc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec asc nulls last) as bar;
       ELSIF sortBy = 'ratingDesc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount desc nulls last;
       ELSIF sortBy = 'ratingAsc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount asc nulls first;
       ELSIF sortBy = 'nameAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) order by lower(name) asc;
       ELSIF sortBy = 'nameDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) order by lower(name) desc;
       ELSIF sortBy = 'dateDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) order by created desc;
       ELSIF sortBy = 'dateAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) order by created asc;
       ELSIF sortBy = 'hot' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName) order by mythgard.deck_hotness(id) desc;
       ELSE
          RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter, pathName, powerName);
       END IF;
       RETURN;
   END

  $$ language plpgsql stable;