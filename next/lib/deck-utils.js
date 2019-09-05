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

export const collectDeckFactions = deckData => {
  try {
    return deckData.cardDecks.nodes.reduce((factionsPerDeck, c) => {
      const factions = c.card.cardFactions.nodes.map(f => f.faction.name);

      factionsPerDeck[c.deckId] = factionsPerDeck[c.deckId]
        ? new Set([...factionsPerDeck[c.deckId], ...factions])
        : factions;

      return factionsPerDeck;
    }, {});
  } catch (e) {
    console.log(e);
    return {};
  }
};
