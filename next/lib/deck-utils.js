export const initializeDeckBuilder = () => {
  return {
    deckName: '',
    deckPath: {},
    deckPower: {},
    deckCoverArt: '',
    mainDeck: {},
    sideboard: [],
    errors: []
  };
};

export const addCardToDeck = (deck, card) => {
  const newDeck = { ...deck };

  if (!newDeck.hasOwnProperty(card.card.id)) {
    newDeck[card.card.id] = card;
    return newDeck;
  }

  const oldQuantity = newDeck[card.card.id].quantity;

  newDeck[card.card.id] = {
    ...newDeck[card.card.id],
    quantity: oldQuantity + card.quantity
  };

  return newDeck;
};
