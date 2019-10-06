import { singleDeckQuery, deckCardsQuery } from '../lib/deck-queries';
import updateDeckAndRemoveCards from '../lib/mutations/update-deck-and-remove-cards';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import { RARITY_MAX_CARDS } from '../constants/rarities';

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
    quantity: getQuantity(card.card, oldQuantity, card.quantity)
  };

  return newDeck;
};

export const hasValidDeckInStorage = () => {
  return isValidDeck(JSON.parse(sessionStorage.getItem('deckInProgress')));
};

export const isValidDeck = d => {
  if (!d) return false;
  const allProperties = Object.keys(initializeDeckBuilder());
  const savedDeckProperties = Object.keys(d);
  return savedDeckProperties.reduce((isValid, key) => {
    return isValid && allProperties.includes(key);
  }, true);
};

export const loadDeckFromSessionStorage = setDeckInProgress => {
  try {
    const d = JSON.parse(sessionStorage.getItem('deckInProgress'));
    if (isValidDeck(d)) {
      setDeckInProgress(d);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const clearDeckInProgress = setDeckInProgressAndSaveInStorage => {
  setDeckInProgressAndSaveInStorage(initializeDeckBuilder());
  resetDeckBuilderSavedState();
};

// The Deck Builder page maintains state more permanently than
// other pages. Sometimes it needs to be cleared out, like before
// editing another deck.
export const resetDeckBuilderSavedState = () => {
  sessionStorage.removeItem('deckInProgressId');
  sessionStorage.removeItem('deckInProgress');
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

export const storeDeckInSessionStorage = (deckId, deck) => {
  sessionStorage.setItem('deckInProgressId', JSON.stringify(deckId));
  sessionStorage.setItem('deckInProgress', JSON.stringify(deck));
};

export const saveDeckWithCards = (
  apolloClient,
  deckId,
  deckInProgress,
  authorId
) => {
  if (Number.isInteger(deckId)) {
    return _updateDeckWithCards(apolloClient, deckId, deckInProgress);
  } else {
    return _createDeckWithCards(apolloClient, deckInProgress, authorId);
  }
};

const _updateDeckWithCards = (apolloClient, deckId, deckInProgress) => {
  return updateDeckAndRemoveCards(apolloClient, deckId, deckInProgress)
    .then(() =>
      addCardsToDBDeck(
        apolloClient,
        deckId,
        Object.values(deckInProgress.mainDeck)
      )
    )
    .then(() => deckId);
};

const _createDeckWithCards = (apolloClient, deckInProgress, authorId) => {
  let deckId;
  return createNewEmptyDeck(apolloClient, deckInProgress, authorId)
    .then(({ data }) => {
      deckId = data.createDeck.deck.id;
      return addCardsToDBDeck(
        apolloClient,
        deckId,
        Object.values(deckInProgress.mainDeck)
      );
    })
    .then(() => deckId);
};

export const getQuantity = (card, oldQuantity, newQuantity) => {
  const rarity = (card && card.rarity && card.rarity.toLowerCase()) || 'common';
  const max = RARITY_MAX_CARDS[rarity] || 1;
  const desiredQuantity = oldQuantity + newQuantity;

  return Math.min(desiredQuantity, max);
};

export const getCardCount = deck => {
  try {
    return Object.values(deck.mainDeck).reduce(
      (count, card) => count + card.quantity,
      0
    );
  } catch (e) {
    return 0;
  }
};
