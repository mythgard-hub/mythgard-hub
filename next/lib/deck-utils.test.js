import { addCardToDeck } from './deck-utils';

describe('Deck utility methods', () => {
  describe('Test addCardToDeck', () => {
    it('Card already exists', function() {
      const deck = {
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        2: {
          quantity: 4,
          card: {
            id: 2,
            name: 'card 2'
          }
        }
      };

      const input1 = {
        quantity: 1,
        card: {
          id: 1,
          name: 'card 1'
        }
      };

      const input2 = {
        quantity: 3,
        card: {
          id: 1,
          name: 'card 1'
        }
      };

      const expected1 = {
        1: {
          quantity: 2,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        2: {
          quantity: 4,
          card: {
            id: 2,
            name: 'card 2'
          }
        }
      };

      const expected2 = {
        1: {
          quantity: 5,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        2: {
          quantity: 4,
          card: {
            id: 2,
            name: 'card 2'
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
            id: 1,
            name: 'card 1'
          }
        }
      };

      const input1 = {
        quantity: 1,
        card: {
          id: 1,
          name: 'card 1'
        }
      };

      const input2 = {
        quantity: 1,
        card: {
          id: 2,
          name: 'card 2'
        }
      };

      const exptected1 = {
        3: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1'
          }
        }
      };

      const exptected2 = {
        3: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        1: {
          quantity: 1,
          card: {
            id: 1,
            name: 'card 1'
          }
        },
        2: {
          quantity: 1,
          card: {
            id: 2,
            name: 'card 2'
          }
        }
      };

      expect(addCardToDeck(deck, input1)).toEqual(exptected1);
      expect(addCardToDeck(exptected1, input2)).toEqual(exptected2);
    });
  });
});
