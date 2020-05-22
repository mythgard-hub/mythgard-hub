import { nameToImage, formatManaCost, cardSort } from './card.js';

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

describe('cardSort', () => {
  const cfn = name => {
    return {
      faction: {
        name
      }
    };
  };
  const cardNode = (faction1, faction2 = '') => {
    const nodes = [];
    nodes.push(cfn(faction1));
    if (faction2) {
      nodes.push(cfn(faction2));
    }
    return {
      cardFactions: { nodes }
    };
  };
  describe('sorts properly monofaction', function() {
    it('sorts norden aztlan', function() {
      const cardNodes = [cardNode('norden'), cardNode('aztlan')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('aztlan')
      ]);
    });
    it('sorts aztlan norden -> norder aztlan', function() {
      const cardNodes = [cardNode('aztlan'), cardNode('norden')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('aztlan')
      ]);
    });
    it('sorts norden dreni -> norden dreni', function() {
      const cardNodes = [cardNode('norden'), cardNode('dreni')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('dreni')
      ]);
    });
    it('sorts parsa dreni -> dreni parsa', function() {
      const cardNodes = [cardNode('parsa'), cardNode('dreni')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('dreni'),
        cardNode('parsa')
      ]);
    });
    it('sorts aztlan norden harmony oberos -> norden aztlan oberos harmony', function() {
      const cardNodes = [
        cardNode('aztlan'),
        cardNode('norden'),
        cardNode('harmony'),
        cardNode('oberos')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('aztlan'),
        cardNode('oberos'),
        cardNode('harmony')
      ]);
    });
  });

  describe('it sorts multifaction', () => {
    it('sorts norden/oberos, norden/aztlan => norden/aztlan, norden/oberos ', function() {
      const cardNodes = [
        cardNode('norden', 'oberos'),
        cardNode('norden', 'aztlan')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden', 'aztlan'),
        cardNode('norden', 'oberos')
      ]);
    });
    it('ignores order of node factions 1', function() {
      const cardNodes = [
        cardNode('oberos', 'norden'),
        cardNode('aztlan', 'norden')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('aztlan', 'norden'),
        cardNode('oberos', 'norden')
      ]);
    });
    it('ignores order of node factions 2', function() {
      const cardNodes = [
        cardNode('oberos', 'norden'),
        cardNode('norden', 'aztlan')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden', 'aztlan'),
        cardNode('oberos', 'norden')
      ]);
    });
    it('ignores order of node factions 3', function() {
      const cardNodes = [
        cardNode('aztlan', 'norden'),
        cardNode('norden', 'oberos')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('aztlan', 'norden'),
        cardNode('norden', 'oberos')
      ]);
    });
  });
});
