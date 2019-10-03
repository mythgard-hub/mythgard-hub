import { addCardToDeck, getQuantity, getCardCount } from './deck-utils';

describe('Deck utility methods', () => {
  describe('Test addCardToDeck', () => {
    it('Card already exists', function() {
      const deck = {
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        2: {
          quantity: 2,
          card: {
            id: 2,
            name: 'card 2',
            rarity: 'COMMON'
          }
        }
      };

      const input1 = {
        quantity: 1,
        card: {
          id: 1,
          name: 'card 1',
          rarity: 'COMMON'
        }
      };

      const input2 = {
        quantity: 1,
        card: {
          id: 1,
          name: 'card 1',
          rarity: 'COMMON'
        }
      };

      const expected1 = {
        1: {
          quantity: 2,
          card: {
            id: 1,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        2: {
          quantity: 2,
          card: {
            id: 2,
            name: 'card 2',
            rarity: 'COMMON'
          }
        }
      };

      const expected2 = {
        1: {
          quantity: 3,
          card: {
            id: 1,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        2: {
          quantity: 2,
          card: {
            id: 2,
            name: 'card 2',
            rarity: 'COMMON'
          }
        }
      };

      expect(addCardToDeck(deck, input1)).toEqual(expected1);
      expect(addCardToDeck(expected1, input2)).toEqual(expected2);
    });

    it("Card doesn't exist", function() {
      const deck = {
        3: {
          quantity: 1,
          card: {
            id: 3,
            name: 'card 1',
            rarity: 'COMMON'
          }
        }
      };

      const input1 = {
        quantity: 1,
        card: {
          id: 1,
          name: 'card 1',
          rarity: 'COMMON'
        }
      };

      const input2 = {
        quantity: 1,
        card: {
          id: 2,
          name: 'card 2',
          rarity: 'COMMON'
        }
      };

      const exptected1 = {
        3: {
          quantity: 1,
          card: {
            id: 3,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1',
            rarity: 'COMMON'
          }
        }
      };

      const exptected2 = {
        3: {
          quantity: 1,
          card: {
            id: 3,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1',
            rarity: 'COMMON'
          }
        },
        2: {
          quantity: 1,
          card: {
            id: 2,
            name: 'card 2',
            rarity: 'COMMON'
          }
        }
      };

      expect(addCardToDeck(deck, input1)).toEqual(exptected1);
      expect(addCardToDeck(exptected1, input2)).toEqual(exptected2);
    });
  });

  describe('Test addCardToDeck', () => {
    it('Should return the right quantities depending on the rarity', function() {
      const common = { rarity: 'COMMON' };
      const uncommon = { rarity: 'UNCOMMON' };
      const rare = { rarity: 'RARE' };
      const mythic = { rarity: 'MYTHIC' };

      expect(getQuantity(common, 0, 1)).toEqual(1);
      expect(getQuantity(common, 2, 1)).toEqual(3);
      expect(getQuantity(common, 2, 1)).toEqual(3);
      expect(getQuantity(common, 0, 4)).toEqual(4);
      expect(getQuantity(common, 4, 1)).toEqual(4);
      // this can't really happen but w\e
      expect(getQuantity(common, 5, 5)).toEqual(4);

      expect(getQuantity(uncommon, 0, 1)).toEqual(1);
      expect(getQuantity(uncommon, 1, 1)).toEqual(2);
      expect(getQuantity(uncommon, 2, 1)).toEqual(3);
      expect(getQuantity(uncommon, 0, 3)).toEqual(3);
      expect(getQuantity(uncommon, 3, 1)).toEqual(3);
      // this can't really happen but w\e
      expect(getQuantity(uncommon, 5, 5)).toEqual(3);

      expect(getQuantity(rare, 0, 1)).toEqual(1);
      expect(getQuantity(rare, 1, 1)).toEqual(2);
      expect(getQuantity(rare, 2, 1)).toEqual(2);
      expect(getQuantity(rare, 0, 3)).toEqual(2);
      expect(getQuantity(rare, 3, 1)).toEqual(2);
      // this can't really happen but w\e
      expect(getQuantity(rare, 5, 5)).toEqual(2);

      expect(getQuantity(mythic, 0, 1)).toEqual(1);
      expect(getQuantity(mythic, 1, 1)).toEqual(1);
      expect(getQuantity(mythic, 2, 1)).toEqual(1);
      expect(getQuantity(mythic, 0, 3)).toEqual(1);
      expect(getQuantity(mythic, 3, 1)).toEqual(1);
      // this can't really happen but w\e
      expect(getQuantity(mythic, 5, 5)).toEqual(1);
    });
  });

  describe('Test getCardCount', () => {
    it('Should return the right number of cards - no cards', function() {
      const none = {
        mainDeck: {}
      };

      expect(getCardCount(none)).toEqual(0);
    });

    it('Should return the right number of cards - some cards', function() {
      const one = {
        mainDeck: {
          1: { quantity: 7 }
        }
      };

      const someCards = {
        mainDeck: {
          1: { quantity: 1 },
          2: { quantity: 6 },
          3: { quantity: 10 }
        }
      };

      expect(getCardCount(one)).toEqual(7);
      expect(getCardCount(someCards)).toEqual(17);
    });

    it('Should handle nonsense', function() {
      expect(getCardCount(null)).toEqual(0);
      expect(getCardCount([])).toEqual(0);
      expect(getCardCount({})).toEqual(0);
      expect(getCardCount(1)).toEqual(0);
      expect(getCardCount('a')).toEqual(0);
      expect(getCardCount({ mainDeck: 1 })).toEqual(0);
    });
  });
});
