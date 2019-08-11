export const initializeDeckBuilder = () => {
  return {
    deckName: '',
    deckPath: '',
    deckPower: '',
    deckCoverArt: '',
    mainDeck: {},
    sideboard: [],
    errors: []
  };
};

export const addCardToDeck = (deck, card) => {
  const nextDeck = { ...deck };

  if (!nextDeck.hasOwnProperty(card.card.id)) {
    nextDeck[card.card.id] = card;
    return nextDeck;
  }

  const oldQuantity = nextDeck[card.card.id].quantity;

  nextDeck[card.card.id] = {
    ...nextDeck[card.card.id],
    quantity: oldQuantity + card.quantity
  };

  return nextDeck;
};
