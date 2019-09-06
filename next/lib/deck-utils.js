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

export const collectDeckFactions = decks => {
  try {
    return decks.reduce((factionsPerDeck, deck) => {
      const deckFactions = deck.cardDecks.nodes.reduce((factions, cardNode) => {
        const cardFactions = cardNode.card.cardFactions.nodes.map(
          f => f.faction.name
        );

        return [...factions, ...cardFactions];
      }, []);

      factionsPerDeck[deck.id] = factionsPerDeck[deck.id]
        ? new Set([...factionsPerDeck[deck.id], ...deckFactions])
        : deckFactions;

      return factionsPerDeck;
    }, {});
  } catch (e) {
    console.error(e);
    return {};
  }
};
