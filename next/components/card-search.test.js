import { getSuggestions } from './card-search.js';

describe('autosuggest suggestion finder', function() {
  const floop = { name: 'floop' };
  const foo = { name: 'foo' };
  const aFoo = { name: 'aFoo' };
  const largeFoo = { name: 'large foo' };
  const cards = [floop, foo, aFoo, largeFoo];
  describe('it finds no cards', function() {
    it('finds no cards', function() {
      const result = getSuggestions('bar', cards);
      const expected = [];
      expect(result).toEqual(expected);
    });
    it('extra chars', function() {
      const result = getSuggestions('fooo', cards);
      const expected = [];
      expect(result).toEqual(expected);
    });
  });
  describe('it finds cards', function() {
    it('partial word', function() {
      const result = getSuggestions('fl', cards);
      const expected = [floop];
      expect(result).toEqual(expected);
    });
    it('full word', function() {
      const result = getSuggestions('floop', cards);
      const expected = [floop];
      expect(result).toEqual(expected);
    });
    it('multi', function() {
      const result = getSuggestions('foo', cards);
      const expected = [foo, aFoo, largeFoo];
      expect(result).toEqual(expected);
    });
    it('case insensitive', function() {
      const result = getSuggestions('afoo', cards);
      const expected = [aFoo];
      expect(result).toEqual(expected);
    });
    it('whitespace', function() {
      const result = getSuggestions('large ', cards);
      const expected = [largeFoo];
      expect(result).toEqual(expected);
    });
  });
});
