import { singleDeckQuery, deckCardsQuery } from '../lib/deck-queries';
import updateDeckAndRemoveCards from '../lib/mutations/update-deck-and-remove-cards';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import { useState } from 'react';
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

export const useStateDeck = deckId => {
  const [deckInProgress, _setDeckInProgress] = useState(
    initializeDeckBuilder()
  );
  // Sync our edits locally as they're made. This let's us re-populate a deck
  // after a page refresh or a sequence of redirects.
  const setDeckInProgress = d => {
    _setDeckInProgress(d);
    sessionStorage.setItem('deckInProgressId', JSON.stringify(deckId));
    sessionStorage.setItem('deckInProgress', JSON.stringify(d));
  };
  return [deckInProgress, setDeckInProgress];
};

// Do not run on server. Please run inside useEffect.
// `useEffect` will not run on the server. As long as we're using
// local/session storage, we need to make sure the code that loads/unloads a
// previously worked on decks is not run during an SSR.
export const loadExistingDeck = (
  deckId,
  deckInProgress,
  setDeckInProgress,
  setIsError,
  client
) => {
  const storedDeckId = sessionStorage.getItem('deckInProgressId');
  if (`${storedDeckId}` === `${deckId}`) {
    if (!loadDeckFromSessionStorage(setDeckInProgress)) {
      loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
    }
  } else {
    sessionStorage.removeItem('deckInProgressId');
    sessionStorage.removeItem('deckInProgress');
    if (Number.isInteger(deckId)) {
      loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
    } else {
      // Needed in case you hit the deck builder tab while editing an existing
      // deck.
      setDeckInProgress(initializeDeckBuilder());
    }
  }
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
