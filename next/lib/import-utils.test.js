import {
  metaLineInvalid,
  formatCardLines,
  cardLinesValid,
  getImportErrors,
  extractMetaValue,
  convertImportToDeck
} from './import-utils';
import { META_KEYS } from '../constants/deck';

const allCards = [
  { id: 1, rarity: 'COMMON', name: 'card' },
  { id: 2, rarity: 'COMMON', name: 'cards' },
  { id: 3, rarity: 'COMMON', name: 'card name' },
  { id: 4, rarity: 'COMMON', name: 'other card name' },
  { id: 5, rarity: 'COMMON', name: 'weird  card  name' },
  { id: 5, rarity: 'COMMON', name: 'Ghul' }
];

const allPowers = [
  { id: 1, name: 'power 1' },
  { id: 2, name: 'my power' },
  { id: 3, name: 'other power' }
];

const allPaths = [
  { id: 1, name: 'path 1' },
  { id: 2, name: 'my path' },
  { id: 3, name: 'other path' }
];

describe('Import utility methods', () => {
  describe('Test extractMetaValue', () => {
    it('should return the trimmed meta value of a line - all present', function() {
      const input = [
        'name: my deck',
        'power:  my power',
        'path: ',
        'coverart: my  coverart  ',
        '1 card',
        '2 cards'
      ];

      expect(extractMetaValue(input, META_KEYS.NAME)).toBe('my deck');
      expect(extractMetaValue(input, META_KEYS.POWER)).toBe('my power');
      expect(extractMetaValue(input, META_KEYS.PATH)).toBe('');
      expect(extractMetaValue(input, META_KEYS.COVER_ART)).toBe('my  coverart');
    });

    it('should return the trimmed meta value of a line - validated against possible values', function() {
      const input = [
        'power:  my power',
        'path: my path',
        'coverart: my  coverart  ',
        '1 card',
        '2 cards'
      ];

      expect(extractMetaValue(input, META_KEYS.POWER, allPowers)).toEqual({
        id: 2,
        name: 'my power'
      });
      expect(extractMetaValue(input, META_KEYS.PATH, allPaths)).toEqual({
        id: 2,
        name: 'my path'
      });
      expect(extractMetaValue(input, META_KEYS.PATH, [])).toBe(null);
      expect(
        extractMetaValue(input, META_KEYS.PATH, [
          { id: 1, name: 'nothing' },
          { id: 2, name: 'applicable' }
        ])
      ).toEqual(null);
    });

    it('should return the trimmed meta value of a line - partial', function() {
      const input = [
        'name: my deck',
        'power:  my power',
        'path: ',
        '1 card',
        '2 cards'
      ];

      expect(extractMetaValue(input, META_KEYS.NAME)).toBe('my deck');
    });

    it('should return the trimmed meta value of a line - invalid input', function() {
      expect(extractMetaValue(null, META_KEYS.NAME)).toBe(null);
      expect(extractMetaValue(1, META_KEYS.POWER)).toBe(null);
      expect(extractMetaValue([1, 2, 'a'], META_KEYS.PATH)).toBe(null);
      expect(extractMetaValue({ a: 'a' }, META_KEYS.COVER_ART)).toBe(null);
    });
  });

  describe('Test metaLineInvalid', () => {
    it('should return true if the meta line is invalid', function() {
      expect(metaLineInvalid(null)).toBe(true);
      expect(metaLineInvalid(1, null)).toBe(true);
      expect(metaLineInvalid('abc', null)).toBe(true);
      expect(metaLineInvalid([], null)).toBe(true);
      expect(metaLineInvalid([1, 'abc'], null)).toBe(true);
      expect(metaLineInvalid(null, META_KEYS.NAME)).toBe(true);
      expect(metaLineInvalid(1, META_KEYS.NAME)).toBe(true);
      expect(metaLineInvalid('', META_KEYS.NAME)).toBe(true);
      expect(metaLineInvalid('hi', META_KEYS.NAME)).toBe(true);
      expect(metaLineInvalid('name', META_KEYS.NAME)).toBe(true);
      expect(metaLineInvalid('path pathy path', META_KEYS.NAME)).toBe(true);
    });

    it('should return false if the meta line is valid - name', function() {
      expect(metaLineInvalid('name: decky', META_KEYS.NAME)).toBe(false);
      expect(metaLineInvalid('name: decky-deck', META_KEYS.NAME)).toBe(false);
      expect(metaLineInvalid('name: my deck name', META_KEYS.NAME)).toBe(false);
      expect(metaLineInvalid('name: my deck name', META_KEYS.NAME)).toBe(false);
      expect(metaLineInvalid('name:no space deck', META_KEYS.NAME)).toBe(false);
    });

    it('should return false if the meta line is valid - path, power, coverart', function() {
      expect(metaLineInvalid('path: my deck path', META_KEYS.PATH)).toBe(false);
      expect(metaLineInvalid('path: ', META_KEYS.PATH)).toBe(false);
      expect(metaLineInvalid('path:', META_KEYS.PATH)).toBe(false);
      expect(metaLineInvalid('power:    lots of spaces', META_KEYS.POWER)).toBe(
        false
      );
      expect(metaLineInvalid('power: ', META_KEYS.POWER)).toBe(false);
      expect(metaLineInvalid('power:', META_KEYS.POWER)).toBe(false);
      expect(metaLineInvalid('coverart: myself', META_KEYS.COVER_ART)).toBe(
        false
      );
      expect(metaLineInvalid('coverart: ', META_KEYS.COVER_ART)).toBe(false);
      expect(metaLineInvalid('coverart:', META_KEYS.COVER_ART)).toBe(false);
    });
  });

  describe('Test formatCardLines', () => {
    const expected = [
      { quantity: 1, card: { id: 3, rarity: 'COMMON', name: 'card name' } },
      {
        quantity: 2,
        card: { id: 4, rarity: 'COMMON', name: 'other card name' }
      },
      {
        quantity: 3,
        card: { id: 5, rarity: 'COMMON', name: 'weird  card  name' }
      }
    ];

    it('should format the line for each card - multiple valid lines', function() {
      const input = ['1 card name', '2 other card name', '3 weird  card  name'];

      expect(formatCardLines(input, allCards)).toEqual(expected);
    });

    it('should format the line for each card - multiple valid lines with empty lines', function() {
      const input = [
        '1 card name',
        '2 other card name',
        '',
        ' ',
        '3 weird  card  name'
      ];

      expect(formatCardLines(input, allCards)).toEqual(expected);
    });

    it('should format the line for each card - single valid line', function() {
      const input = ['1 card name'];
      const expectedSmaller = [expected[0]];

      expect(formatCardLines(input, allCards)).toEqual(expectedSmaller);
    });

    it('should format the line for each card - all invalid lines', function() {
      expect(formatCardLines([], allCards)).toEqual([]);
      expect(formatCardLines(['wow', 'much', 1], allCards)).toEqual([
        'wow',
        'much'
      ]);
      expect(formatCardLines([1], allCards)).toEqual([]);
      expect(formatCardLines(['wow'], allCards)).toEqual(['wow']);
      expect(
        formatCardLines(['hellow world', 'hi universe'], allCards)
      ).toEqual(['hellow world', 'hi universe']);
    });

    it('should format the line for each card - some invalid lines', function() {
      const input = [
        '1 card name',
        3,
        '2 other card name',
        '',
        '3 weird  card  name',
        'wow'
      ];

      const expectedInvalid = [...expected, 'wow'];

      expect(formatCardLines(input, allCards)).toEqual(expectedInvalid);
    });
  });

  describe('Test cardLinesValid', () => {
    it('should return true if all lines are valid cards', function() {
      const multipleCards = [
        { quantity: 1, card: { name: 'card name' } },
        { quantity: 2, card: { name: 'other card name' } },
        { quantity: 3, card: { name: 'weird  card  name' } }
      ];
      const singleCard = [{ quantity: 1, card: { name: 'card name' } }];

      expect(cardLinesValid(multipleCards)).toEqual(true);
      expect(cardLinesValid(singleCard)).toEqual(true);
      expect(cardLinesValid([])).toEqual(true);
    });

    it('should return false if even one line is invalid - all invalid', function() {
      expect(cardLinesValid(['wow', 'much', 1])).toEqual(false);
      expect(cardLinesValid([1])).toEqual(false);
      expect(cardLinesValid(['wow'])).toEqual(false);
      expect(cardLinesValid(['hellow world', 'hi universe'])).toEqual(false);
    });

    it('should format the line for each card - some invalid lines', function() {
      const input = [
        { quantity: 1, name: 'card name' },
        3,
        { quantity: 2, name: 'other card name' },
        '',
        { quantity: 3, name: 'weird  card  name' },
        'wow'
      ];
      expect(cardLinesValid(input)).toEqual(false);
    });
  });

  describe('Test getImportErrors', () => {
    it('Should return an empty list of errors', function() {
      const multipleCards = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: myself',
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');
      const singleCard = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '1 card name'
      ].join('\n');
      const noPathOrPower = [
        'name: New Deck',
        'path: ',
        'power: ',
        '1 card name',
        '2 other card name'
      ].join('\n');

      expect(getImportErrors(multipleCards, '', allCards)).toEqual([]);
      expect(getImportErrors(singleCard, '', allCards)).toEqual([]);
      expect(getImportErrors(noPathOrPower, '', allCards)).toEqual([]);
    });

    it('should show an empty list of errors - empty lines', function() {
      const main = [
        'name: my deck',
        'path: my path',
        'power: my power',
        '1 card name',
        '2 other card name',
        '',
        ' ',
        '3 weird  card  name'
      ].join('\n');

      expect(getImportErrors(main, '', allCards)).toEqual([]);
    });

    it('should show a list of errors - import with no metalines', function() {
      const input = [
        '1 card name',
        '2 other card name',
        '',
        ' ',
        '3 weird  card  name'
      ].join('\n');

      expect(getImportErrors(input, '', allCards)).toEqual([]);
    });

    it('should return a list of errors - invalid cards', function() {
      const input = [
        '1 card name',
        '2 other card name',
        'bladiblah',
        '3 weird  card  name',
        'bladiblah'
      ].join('\n');

      const expected = [
        'Invalid input for main deck',
        'Invalid input for sideboard'
      ];

      expect(getImportErrors(input, input, allCards)).toEqual(expected);
    });

    it('should show a list of errors - empty input', function() {
      expect(getImportErrors('', '', allCards)).toEqual([
        'Deck must have cards'
      ]);
      expect(getImportErrors(null, '', allCards)).toEqual([
        'Invalid input for main deck'
      ]);
    });
  });

  describe('Test convertImportToDeck', () => {
    it('Should convert an import to a deck in progress - single card', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '1 card name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);
      const mainDeck = Object.values(result.mainDeck);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(mainDeck.length).toEqual(1);
      expect(mainDeck[0].quantity).toEqual(1);
    });

    it('Should convert an import to a deck in progress - more than max', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '5 card name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);
      const mainDeck = Object.values(result.mainDeck);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(mainDeck.length).toEqual(1);
      expect(mainDeck[0].quantity).toEqual(4);
    });

    it('Should convert an import to a deck in progress - duplicate lines', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '1 card name',
        '3 card name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);
      const mainDeck = Object.values(result.mainDeck);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(mainDeck.length).toEqual(1);
      expect(mainDeck[0].quantity).toEqual(4);
    });

    it('Should convert an import to a deck in progress - duplicate lines more than max', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '2 card name',
        '3 card name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);
      const mainDeck = Object.values(result.mainDeck);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(mainDeck.length).toEqual(1);
      expect(mainDeck[0].quantity).toEqual(4);
    });

    it('Should convert an import to a deck in progress - multiple cards', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: myself',
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('myself');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should convert an import to a deck in progress - meta valus capital letters', function() {
      const input = [
        'Name: my deck',
        'Path: my path',
        'Power: my power',
        'Coverart: myself',
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('myself');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should convert an import to a deck in progress - meta valus upper case', function() {
      const input = [
        'NAME: my deck',
        'PATH: my path',
        'POWER: my power',
        'COVERART: myself',
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('myself');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should convert an import to a deck in progress - partial meta information', function() {
      const input = [
        'name: my deck',
        'power: my power',
        'coverart: myself',
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('myself');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual(null);
      expect(result.deckPower).toEqual('my power');
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should convert an import to a deck in progress - no meta information', function() {
      const input = [
        '1 card name',
        '2 other card name',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual(null);
      expect(result.deckName).toEqual(null);
      expect(result.deckPath).toEqual(null);
      expect(result.deckPower).toEqual(null);
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should convert an import to a deck in progress - cards with accents', function() {
      const input = ['2 ghūl'].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual(null);
      expect(result.deckName).toEqual(null);
      expect(result.deckPath).toEqual(null);
      expect(result.deckPower).toEqual(null);
      expect(Object.values(result.mainDeck).length).toEqual(1);
    });

    it('Should convert an import to a deck in progress - empty lines', function() {
      const input = [
        'name: my deck',
        'path: my path',
        'power: my power',
        'coverart: ',
        '1 card name',
        '2 other card name',
        '',
        ' ',
        '3 weird  card  name'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(0);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('my deck');
      expect(result.deckPath).toEqual('my path');
      expect(result.deckPower).toEqual('my power');
      expect(Object.values(result.mainDeck).length).toEqual(3);
    });

    it('Should not do anything besides populate errors - invalid cards', function() {
      const input = [
        '1 card name',
        '2 other card name',
        'bladiblah',
        '3 weird  card  name',
        'bladiblah'
      ].join('\n');

      const result = convertImportToDeck(input, '', allCards);

      expect(result.errors.length).toEqual(1);
      expect(result.deckCoverArt).toEqual('');
      expect(result.deckName).toEqual('Untitled');
      expect(result.deckPath).toEqual({});
      expect(result.deckPower).toEqual({});
      expect(Object.values(result.mainDeck).length).toEqual(0);
    });
  });
});
