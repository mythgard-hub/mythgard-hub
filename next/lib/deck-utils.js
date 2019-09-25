import { singleDeckQuery, deckCardsQuery } from '../lib/deck-queries';

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

export const loadDeckFromSessionStorage = setDeckInProgress => {
  try {
    const d = JSON.parse(sessionStorage.getItem('deckInProgress'));
    if (!d) return;
    const allProperties = Object.keys(initializeDeckBuilder());
    const savedDeckProperties = Object.keys(d);
    const isValidDeck = savedDeckProperties.reduce((isValid, key) => {
      return isValid && allProperties.includes(key);
    }, true);
    if (isValidDeck) {
      setDeckInProgress(d);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const loadDeckFromServer = (
  apolloClient,
  deckId,
  setDeckInProgress,
  setIsError
) => {
  // noop if we don't have a legit deck id
  if (!Number.isInteger(deckId)) return;

  const deckPromise = apolloClient.query({
    query: singleDeckQuery,
    variables: {
      id: deckId
    }
  });

  const cardsPromise = apolloClient.query({
    query: deckCardsQuery,
    variables: {
      id: deckId
    }
  });

  Promise.all([deckPromise, cardsPromise])
    .then(args => {
      const deck = args[0].data.deck;
      // I wonder if Lily can feel such a great disturbance in the force while
      // she's on vacation :thinkingface:
      const cards = args[1].data.deck.cardDecks.nodes;
      setDeckInProgress({
        deckName: deck.name,
        deckPath: deck.path,
        deckPower: deck.power,
        mainDeck: cards.reduce((acc, c) => {
          acc[c.card.id] = c;
          return acc;
        }, {})
      });
    })
    .catch(reason => {
      console.error(reason);
      setIsError(true);
    });
};
