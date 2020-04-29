ALTER TABLE deck
ADD COLUMN views integer default 0;

CREATE OR REPLACE FUNCTION mythgard.increase_deck_views (IN deckid INTEGER)
RETURNS INTEGER AS $$

  UPDATE mythgard.deck SET views = views + 1
  WHERE deck.id = deckid;

  SELECT views
  FROM mythgard.deck
  WHERE deck.id = deckid;
$$ language sql VOLATILE SECURITY DEFINER;

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
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type, views
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec desc nulls last) as bar;
       ELSIF sortBy = 'essenceAsc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type, views
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