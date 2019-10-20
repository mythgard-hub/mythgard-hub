import { nameToImage, formatManaCost } from './card.js';

describe('nameToImage', () => {
  it('handles empty string', function() {
    const result = nameToImage('');
    expect(result).toEqual('');
  });

  it('handles single letter', function() {
    const result = nameToImage('x');
    expect(result).toEqual('X');
  });

  it('handles a word', function() {
    const result = nameToImage('Xenagos');
    expect(result).toEqual('Xenagos');
  });

  it('handles a word 2', function() {
    const result = nameToImage('Xenagos ');
    expect(result).toEqual('Xenagos');
  });

  it('handles a word 3', function() {
    const result = nameToImage('Volition™');
    expect(result).toEqual('Volition');
  });

  it('handles a word 4', function() {
    const result = nameToImage('fOOBAR');
    expect(result).toEqual('Foobar');
  });

  it('handles a word 4', function() {
    const result = nameToImage('Born-Again');
    expect(result).toEqual('Born-Again');
  });

  it('handles two words', function() {
    const result = nameToImage('Xenagos the');
    expect(result).toEqual('Xenagos_The');
  });

  it('handles two words 2', function() {
    const result = nameToImage('Xenagos t');
    expect(result).toEqual('Xenagos_T');
  });

  it('handles three words', function() {
    const result = nameToImage('Xenagos the Reveler');
    expect(result).toEqual('Xenagos_The_Reveler');
  });
});

describe('formatManaCost', () => {
  it('gets a positive mana cost', function() {
    expect(formatManaCost({ mana: 5 })).toEqual(5);
    expect(formatManaCost({ mana: 0 })).toEqual(0);
    expect(formatManaCost({ mana: 1 })).toEqual(1);
    expect(formatManaCost({ mana: 15 })).toEqual(15);
  });

  it('gets a negative mana cost', function() {
    expect(formatManaCost({ mana: -1 })).toEqual('X');
    expect(formatManaCost({ mana: -10 })).toEqual('X');
  });

  it('gets nonsense data', function() {
    expect(formatManaCost({ mana: 'a' })).toEqual('a');
    expect(formatManaCost()).toEqual('');
    expect(formatManaCost({})).toEqual('');
    expect(formatManaCost(null)).toEqual('');
  });
});
