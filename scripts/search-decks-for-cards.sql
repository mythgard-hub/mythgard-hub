SELECT deck.name,
    card_deck.id as cardDeckId,
    card.name,
    card_faction.id as cardFactionId,
    faction.name
   FROM deck
     LEFT JOIN card_deck ON (card_deck.deck_id = deck.id)
     LEFT JOIN card ON (card.id = card_deck.card_id)
     LEFT JOIN card_faction ON (card.id = card_faction.card_id)
     LEFT JOIN faction ON (faction.id = card_faction.faction_id)
