import { submitOnEnter } from './form-utils';

describe('Form utility methods', () => {
  describe('Test submitOnEnter', () => {
    it('Should call onSubmit on enter key', function() {
      const mockOnSubmit = jest.fn(e => console.log('submitted'));
      const event = {
        keyCode: 13
      };

      submitOnEnter(event, mockOnSubmit);

      expect(mockOnSubmit.mock.calls.length).toBe(1);
    });

    it('Should not call it on other keys', function() {
      const mockOnSubmit = jest.fn(e => console.log('submitted'));
      const event = {
        keyCode: 12
      };
      const event2 = {
        keyCode: 'a'
      };

      submitOnEnter(event, mockOnSubmit);
      submitOnEnter(event2, mockOnSubmit);

      expect(mockOnSubmit.mock.calls.length).toBe(0);
    });

    it('Should handle missing data gracefully', function() {
      const mockOnSubmit = jest.fn(e => console.log('submitted'));

      submitOnEnter(null, mockOnSubmit);
      submitOnEnter(1, mockOnSubmit);
      submitOnEnter('a', mockOnSubmit);
      submitOnEnter([1, 2], mockOnSubmit);
      submitOnEnter([1, 'b'], mockOnSubmit);
      submitOnEnter([1, 2], null);
      submitOnEnter([1, 2]);
      submitOnEnter();

      expect(mockOnSubmit.mock.calls.length).toBe(0);
    });
  });
});
