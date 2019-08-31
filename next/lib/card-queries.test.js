import { intEnumsToGQLVars } from './card-queries.js';

describe('intEnumsToGQLVars', () => {
  it('handles undefined input gracefully', function() {
    const result = intEnumsToGQLVars();
    expect(result).toEqual([null, null]);
  });
  it('handles empty input gracefully', function() {
    const result = intEnumsToGQLVars([]);
    expect(result).toEqual([null, null]);
  });
  it('handles one discrete mana cost', function() {
    const [result] = intEnumsToGQLVars(['1']);
    expect(result).toEqual([1]);
  });
  it('handles one gte mana cost', function() {
    const [, result] = intEnumsToGQLVars(['6+']);
    expect(result).toEqual(6);
  });
  it('handles multiples', function() {
    const result = intEnumsToGQLVars(['3', '7+']);
    expect(result).toEqual([[3], 7]);
  });
  it('handles multiples 2', function() {
    const result = intEnumsToGQLVars(['1', '4', '9+']);
    expect(result).toEqual([[1, 4], 9]);
  });
});
