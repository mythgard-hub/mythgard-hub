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
