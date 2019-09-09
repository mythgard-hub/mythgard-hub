drop function search_decks;
drop INDEX deck_name_index; 

CREATE INDEX deck_name_index ON deck
    USING gin(to_tsvector('simple',deck.name));

--                            search_decks  
--         searches for decks (advanced search with several criteria)
-- RETURNS setof deck
-- PARAMS:
-- deckName str or null - name of deck (prefix only, so finds dragons given drag but not given rag)
-- numCards int         - number of cardN params that are not null (see next 5 params)
--                        needed for searching decks that have specific cards in them. TODO - refactor this out
-- card1    int or null - id of card being searched for (search supports at most 5 cards)
-- card2    int or null - id of card being searched for (search supports at most 5 cards)
-- card3    int or null - id of card being searched for (search supports at most 5 cards)
-- card4    int or null - id of card being searched for (search supports at most 5 cards)
-- card5    int or null - id of card being searched for (search supports at most 5 cards)
create function search_decks(deckName varchar(255), numCards integer, card1 integer, card2 Integer, card3 Integer, card4 Integer, card5 Integer)
  returns setof deck as $$
    select deck.*
    FROM deck
     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
     LEFT JOIN card ON (card.id = card_deck.card_id)
   -- deck name filter
   WHERE (deckName is NULL or to_tsvector('simple', deck.name) @@ to_tsquery('simple',deckName || ':*')) 
         -- cards filter
     AND (numCards = 0 or (card.id in (card1, card2, card3, card4, card5)))

   GROUP BY deck.id
   -- Ensures that card filter requires *all* the specified cards, rather than *any* of them.
   HAVING count(distinct card.id) = numCards
   LIMIT 500;
  $$ language sql stable;

select * from search_decks(null, 1, 1, null, null, null, null);

-- select deck.name, array_agg(card.id) as foo
--     FROM deck
--      LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
--      LEFT JOIN card ON (card.id = card_deck.card_id)
--    
--     where card.id in (1,2,3)
--  
--    GROUP BY deck.id
--    having count(distinct card.id) = 2
--    LIMIT 500;

-------------------------

--select deckName, cardNames, cardIds
--  FROM 
-- (select deck.name as deckName, array_agg(card.name) as cardNames, array_agg(card.id) as cardIds
--    FROM deck
--     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
--     LEFT JOIN card ON (card.id = card_deck.card_id)
--   GROUP BY deckName) deckWithCards
