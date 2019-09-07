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

export const collectDecksFactionsAndMana = decks => {
  try {
    return decks.reduce((aggregatedDecksData, deck) => {
      aggregatedDecksData[deck.id] = deck.cardDecks.nodes.reduce(
        (deckInfo, cardNode) => {
          const cardFactions = cardNode.card.cardFactions.nodes.map(
            f => f.faction.name
          );
          const cardMana = cardNode.quantity * cardNode.card.mana;

          return {
            mana: deckInfo.mana + cardMana,
            factions: new Set([...deckInfo.factions, ...cardFactions])
          };
        },
        { mana: 0, factions: [] }
      );

      return aggregatedDecksData;
    }, {});
  } catch (e) {
    console.error(e);
    return {};
  }
};
