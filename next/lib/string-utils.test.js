import { ordinalized } from './string-utils';

describe('String utility methods', () => {
  describe('Test ordinalized', () => {
    it('Should return a number ordinalized', function() {
      expect(ordinalized(0)).toBe('0th');
      expect(ordinalized(1)).toBe('1st');
      expect(ordinalized(2)).toBe('2nd');
      expect(ordinalized(3)).toBe('3rd');
      expect(ordinalized(4)).toBe('4th');
      expect(ordinalized(5)).toBe('5th');
      expect(ordinalized(10)).toBe('10th');
      expect(ordinalized(50)).toBe('50th');
      expect(ordinalized(500)).toBe('500th');
    });

    it('Should handle nonsense data gracefully', function() {
      expect(ordinalized('1')).toBe('');
      expect(ordinalized([])).toBe('');
      expect(ordinalized()).toBe('');
      expect(ordinalized([1, 1])).toBe('');
      expect(ordinalized({ a: 'a' })).toBe('');
      expect(ordinalized(null)).toBe('');
    });
  });
});
