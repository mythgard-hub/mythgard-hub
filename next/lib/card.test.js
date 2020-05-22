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
  describe('it sorts mixed monofaction and multifaction', () => {
    it('priotizes monofaction', function() {
      const cardNodes = [cardNode('norden'), cardNode('norden', 'aztlan')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('norden', 'aztlan')
      ]);
    });
    it('priotizes monofaction 2', function() {
      const cardNodes = [cardNode('norden', 'aztlan'), cardNode('norden')];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('norden'),
        cardNode('norden', 'aztlan')
      ]);
    });
    it('prioritizes monofaction 3', function() {
      const cardNodes = [
        cardNode('parsa'),
        cardNode('oberos', 'norden'),
        cardNode('norden', 'aztlan'),
        cardNode('dreni')
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode('dreni'),
        cardNode('parsa'),
        cardNode('norden', 'aztlan'),
        cardNode('oberos', 'norden')
      ]);
    });
  });

  const cardNode2 = (faction, mana) => {
    const result = cardNode(faction);
    result.mana = mana;
    return result;
  };
  describe('it considers cost', () => {
    it('const test 1', function() {
      const cardNodes = [cardNode2('parsa', 2), cardNode2('parsa', 1)];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode2('parsa', 1),
        cardNode2('parsa', 2)
      ]);
    });
    it('cost test 2', function() {
      const cardNodes = [cardNode2('parsa', 1), cardNode2('parsa', 2)];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode2('parsa', 1),
        cardNode2('parsa', 2)
      ]);
    });
    it('cost test 3', function() {
      const cardNodes = [
        cardNode2('parsa', 2),
        cardNode2('parsa', 1),
        cardNode2('parsa', 3)
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode2('parsa', 1),
        cardNode2('parsa', 2),
        cardNode2('parsa', 3)
      ]);
    });
  });
  const cardNode3 = (faction, mana, name = 'doots') => {
    const result = cardNode(faction);
    result.mana = mana;
    result.name = name;
    return result;
  };
  describe('it considers name after mana', () => {
    it('considers num gems 1', () => {
      const cardNodes = [
        cardNode3('parsa', 1),
        cardNode3('parsa', 2, 'foo'),
        cardNode3('parsa', 2, 'bar'),
        cardNode3('parsa', 2, 'zeta'),
        cardNode3('parsa', 2, 'baz'),
        cardNode3('parsa', 3)
      ];
      expect(cardNodes.sort(cardSort)).toEqual([
        cardNode3('parsa', 1),
        cardNode3('parsa', 2, 'bar'),
        cardNode3('parsa', 2, 'baz'),
        cardNode3('parsa', 2, 'foo'),
        cardNode3('parsa', 2, 'zeta'),
        cardNode3('parsa', 3)
      ]);
    });
  });
});
