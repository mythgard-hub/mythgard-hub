import { exportDeck } from './export-utils';
import { initializeDeckBuilder } from './deck-utils';

describe('Import utility methods', () => {
  describe('Test exportDeck', () => {
    it('No meta values', function() {
      const deckInProgress = initializeDeckBuilder();
      deckInProgress.mainDeck = {
        1: { quantity: 1, card: { id: 1, name: 'card 1' } },
        2: { quantity: 2, card: { id: 2, name: 'card 2' } },
        4: { quantity: 4, card: { id: 4, name: 'card 4' } }
      };

      const result = exportDeck(deckInProgress);
      const expected = [
        'name: ',
        'path: ',
        'power: ',
        'coverart: ',
        '1 card 1',
        '2 card 2',
        '4 card 4'
      ].join('\n');

      expect(result).toEqual(expected);
    });

    it('Some meta values', function() {
      const deckInProgress = initializeDeckBuilder();
      deckInProgress.deckName = 'my deck';
      deckInProgress.deckCoverArt = 'myself';
      deckInProgress.mainDeck = {
        1: { quantity: 1, card: { id: 1, name: 'card 1' } },
        2: { quantity: 2, card: { id: 2, name: 'card 2' } },
        4: { quantity: 4, card: { id: 4, name: 'card 4' } }
      };

      const result = exportDeck(deckInProgress);
      const expected = [
        'name: my deck',
        'path: ',
        'power: ',
        'coverart: myself',
        '1 card 1',
        '2 card 2',
        '4 card 4'
      ].join('\n');

      expect(result).toEqual(expected);
    });

    it('All meta values', function() {
      const deckInProgress = initializeDeckBuilder();
      deckInProgress.deckName = 'my deck';
      deckInProgress.deckCoverArt = 'myself';
      deckInProgress.deckPath = 'my path';
      deckInProgress.deckPower = 'power rangers';
      deckInProgress.mainDeck = {
        1: { quantity: 1, card: { id: 1, name: 'card 1' } },
        2: { quantity: 2, card: { id: 2, name: 'card 2' } },
        4: { quantity: 4, card: { id: 4, name: 'card 4' } }
      };

      const result = exportDeck(deckInProgress);
      const expected = [
        'name: my deck',
        'path: my path',
        'power: power rangers',
        'coverart: myself',
        '1 card 1',
        '2 card 2',
        '4 card 4'
      ].join('\n');

      expect(result).toEqual(expected);
    });

    it('Single card', function() {
      const deckInProgress = initializeDeckBuilder();
      deckInProgress.deckName = 'my deck';
      deckInProgress.deckCoverArt = 'myself';
      deckInProgress.deckPath = 'my path';
      deckInProgress.deckPower = 'power rangers';
      deckInProgress.mainDeck = {
        1: { quantity: 1, card: { id: 1, name: 'card 1' } }
      };

      const result = exportDeck(deckInProgress);
      const expected = [
        'name: my deck',
        'path: my path',
        'power: power rangers',
        'coverart: myself',
        '1 card 1'
      ].join('\n');

      expect(result).toEqual(expected);
    });

    it('No cards', function() {
      const deckInProgress = initializeDeckBuilder();
      deckInProgress.deckName = 'my deck';
      deckInProgress.deckCoverArt = 'myself';

      const result = exportDeck(deckInProgress);
      const expected = [
        'name: my deck',
        'path: ',
        'power: ',
        'coverart: myself',
        ''
      ].join('\n');

      expect(result).toEqual(expected);
    });
  });
});
