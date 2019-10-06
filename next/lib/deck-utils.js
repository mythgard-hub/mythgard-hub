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

export const getQuantity = (card, oldQuantity, newQuantity) => {
  const rarity = (card && card.rarity && card.rarity.toLowerCase()) || 'common';
  const max = RARITY_MAX_CARDS[rarity] || 1;
  const desiredQuantity = oldQuantity + newQuantity;

  return Math.min(desiredQuantity, max);
};
