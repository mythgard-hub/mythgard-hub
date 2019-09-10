drop function if exists search_decks;
drop INDEX if exists deck_name_index;
drop INDEX if exists author_name_index;

CREATE INDEX deck_name_index ON deck
    USING gin(to_tsvector('simple',deck.name));
CREATE INDEX author_name_index ON account
    USING gin(to_tsvector('simple',account.username));

--                            search_decks
--         searches for decks (advanced search with several criteria)
-- RETURNS setof deck
-- PARAMS:
-- deckName str or null - name of deck (prefix only, so finds dragons given drag but not given rag)
-- authorName str or null - name of author (prefix only, so finds alex given al but not given lex)
-- modified str or null - modified on or after given date (e.g. "2019-07-11")
-- numCards int         - number of cardN params that are not null (see next 5 params)
--                        needed for searching decks that have specific cards in them. TODO - refactor this out
-- card1    int or null - id of card being searched for (search supports at most 5 cards)
-- card2    int or null - id of card being searched for (search supports at most 5 cards)
-- card3    int or null - id of card being searched for (search supports at most 5 cards)
-- card4    int or null - id of card being searched for (search supports at most 5 cards)
-- card5    int or null - id of card being searched for (search supports at most 5 cards)
-- faction1 int or null - id of a faction that deck must contain
-- faction2 int or null - id of a faction that deck must contain
-- faction3 int or null - id of a faction that deck must contain
-- faction4 int or null - id of a faction that deck must contain
-- faction5 int or null - id of a faction that deck must contain
-- faction6 int or null - id of a faction that deck must contain
create function search_decks(deckName varchar(255), authorName varchar(255), deckModified date, numCards integer, card1 integer, card2 Integer, card3 Integer, card4 Integer, card5 Integer, faction1 integer, faction2 integer, faction3 integer, faction4 integer, faction5 integer, faction6 integer)
  returns setof deck as $$

    SELECT deck.* FROM deck
      LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
      LEFT JOIN card ON (card.id = card_deck.card_id)
      LEFT JOIN account ON (account.id = deck.author_id)

    -- deck name filter
    WHERE (deckName is NULL or to_tsvector('simple', deck.name) @@ to_tsquery('simple',deckName || ':*'))
    -- author name filter
    AND (authorName is NULL or to_tsvector('simple', account.username) @@ to_tsquery('simple',authorName || ':*'))
    -- modification date filter
    AND (deckModified is NULL or deck.modified >= deckModified)
    -- cards filter
    AND (numCards is null or numCards = 0 or (card.id in (card1, card2, card3, card4, card5)))

    intersect

    -- factions filter
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction1 is null or faction.id = faction1
    intersect
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction2 is null or faction.id = faction2
    intersect
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction3 is null or faction.id = faction3
    intersect
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction4 is null or faction.id = faction4
    intersect
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction5 is null or faction.id = faction5
    intersect
    SELECT deck.* from deck left join card_deck on (deck.id = card_deck.deck_id) left join card on (card.id = card_deck.card_id) left join card_faction on (card.id = card_faction.card_id) left join faction on (faction.id = card_faction.faction_id)
    where faction6 is null or faction.id = faction6

    GROUP BY deck.id
    -- Ensures that card filter requires *all* the specified cards, rather than *any* of them.
    HAVING numCards is null or numCards = 0 or count(distinct card.id) = numCards
    LIMIT 500;
  $$ language sql stable;

select * from search_decks(null, null, null, null, null, null, null, null, null, null, null, null, null, 2, 1);

-------------------------

-- Debugging tool for seeing joined tables with all values

select deckName, cardNames, cardIds
  FROM
 (select deck.name as deckName, array_agg(card.name) as cardNames, array_agg(card.id) as cardIds
    FROM deck
     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
     LEFT JOIN card ON (card.id = card_deck.card_id)
   LEFT JOIN account ON (account.id = deck.author_id)
   GROUP BY deckName) deckWithCards
