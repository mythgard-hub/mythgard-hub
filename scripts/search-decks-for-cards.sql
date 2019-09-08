create function search_decks_for_cards(card1 integer, card2 Integer, card3 Integer, card4 Integer, card5 Integer)

  returns setof deck as $$
    select deck.*
    FROM deck
     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
     LEFT JOIN card ON (card.id = card_deck.card_id)
   WHERE card.id IN (card1, card2, card3, card4, card5)
   GROUP BY deck.id;
  $$ language sql stable;
