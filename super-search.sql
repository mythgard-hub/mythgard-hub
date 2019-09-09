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
-- numCards int         - number of cardN params that are not null (see next 5 params)
--                        needed for searching decks that have specific cards in them. TODO - refactor this out
-- card1    int or null - id of card being searched for (search supports at most 5 cards)
-- card2    int or null - id of card being searched for (search supports at most 5 cards)
-- card3    int or null - id of card being searched for (search supports at most 5 cards)
-- card4    int or null - id of card being searched for (search supports at most 5 cards)
-- card5    int or null - id of card being searched for (search supports at most 5 cards)
create function search_decks(deckName varchar(255), authorName varchar(255), numCards integer, card1 integer, card2 Integer, card3 Integer, card4 Integer, card5 Integer)
  returns setof deck as $$
    select deck.*
    FROM deck
     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
     LEFT JOIN card ON (card.id = card_deck.card_id)
     LEFT JOIN account ON (account.id = deck.author_id)
   -- deck name filter
   WHERE (deckName is NULL or to_tsvector('simple', deck.name) @@ to_tsquery('simple',deckName || ':*'))
   -- author name filter
     AND (authorName is NULL or to_tsvector('simple', account.username) @@ to_tsquery('simple',authorName || ':*'))
         -- cards filter
     AND (numCards is null or numCards = 0 or (card.id in (card1, card2, card3, card4, card5)))

   GROUP BY deck.id
   -- Ensures that card filter requires *all* the specified cards, rather than *any* of them.
   HAVING numCards is null or numCards = 0 or count(distinct card.id) = numCards
   LIMIT 500;
  $$ language sql stable;

select * from search_decks(null, null, null, null, null, null, null, null);

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
