import { getManaCostVars } from './card-queries.js';

describe('getManaCostVars', () => {
  it('handles undefined input gracefully', function() {
    const result = getManaCostVars();
    expect(result).toEqual([null, null]);
  });
  it('handles empty input gracefully', function() {
    const result = getManaCostVars([]);
    expect(result).toEqual([null, null]);
  });
  it('handles one discrete mana cost', function() {
    const [result] = getManaCostVars(['1']);
    expect(result).toEqual([1]);
  });
  it('handles one gte mana cost', function() {
    const [, result] = getManaCostVars(['6+']);
    expect(result).toEqual(6);
  });
  it('handles multiples', function() {
    const result = getManaCostVars(['3', '7+']);
    expect(result).toEqual([[3], 7]);
  });
  it('handles multiples 2', function() {
    const result = getManaCostVars(['1', '4', '9+']);
    expect(result).toEqual([[1, 4], 9]);
  });
});
