import { getManaCurveHighchartsSeries } from './deck-stats';
import { FACTION_NAMES } from '../constants/factions';

const createFakeCard = (quantity, mana, factionName) => {
  return {
    quantity,
    card: {
      mana,
      cardFactions: {
        nodes: [
          {
            faction: { name: factionName }
          }
        ]
      }
    }
  };
};

describe('Deck stats utility methods', () => {
  describe('Test getManaCurveHighchartsSeries', () => {
    const theme = {
      blueFactionColor: 'blue',
      yellowFactionColor: 'yellow',
      redFactionColor: 'red',
      purpleFactionColor: 'purple',
      orangeFactionColor: 'orange',
      greenFactionColor: 'green'
    };

    it('No cards', function() {
      const result = getManaCurveHighchartsSeries({}, theme);
      const expected = [
        {
          name: FACTION_NAMES[0],
          showInLegend: false,
          color: 'blue',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[1],
          showInLegend: false,
          color: 'yellow',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[2],
          showInLegend: false,
          color: 'red',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[3],
          showInLegend: false,
          color: 'green',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[4],
          showInLegend: false,
          color: 'orange',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[5],
          showInLegend: false,
          color: 'purple',
          data: [0, 0, 0, 0, 0, 0]
        }
      ];

      expect(result).toEqual(expected);
    });

    it('Single faction - all prices present', function() {
      const cards = {
        a: createFakeCard(2, 1, FACTION_NAMES[0]),
        b: createFakeCard(20, 2, FACTION_NAMES[0]),
        c: createFakeCard(200, 3, FACTION_NAMES[0]),
        d: createFakeCard(2000, 4, FACTION_NAMES[0]),
        e: createFakeCard(20000, 5, FACTION_NAMES[0]),
        f: createFakeCard(200000, 6, FACTION_NAMES[0]),
        g: createFakeCard(200000, 20, FACTION_NAMES[0]),
        h: createFakeCard(4, -1, FACTION_NAMES[0])
      };

      const result = getManaCurveHighchartsSeries(cards, theme);
      const expected = [
        {
          name: FACTION_NAMES[0],
          showInLegend: false,
          color: 'blue',
          data: [6, 20, 200, 2000, 20000, 400000]
        },
        {
          name: FACTION_NAMES[1],
          showInLegend: false,
          color: 'yellow',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[2],
          showInLegend: false,
          color: 'red',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[3],
          showInLegend: false,
          color: 'green',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[4],
          showInLegend: false,
          color: 'orange',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[5],
          showInLegend: false,
          color: 'purple',
          data: [0, 0, 0, 0, 0, 0]
        }
      ];

      expect(result).toEqual(expected);
    });

    it('Multiple factions, multiple prices', function() {
      const cards = {
        a: createFakeCard(2, 1, FACTION_NAMES[0]),
        b: createFakeCard(3, 2, FACTION_NAMES[0]),
        c: createFakeCard(5, 6, FACTION_NAMES[0]),
        d: createFakeCard(10, 4, FACTION_NAMES[1]),
        e: createFakeCard(3, 5, FACTION_NAMES[2]),
        f: createFakeCard(20, 5, FACTION_NAMES[2]),
        g: createFakeCard(8, 1, FACTION_NAMES[2]),
        h: createFakeCard(10, 10, FACTION_NAMES[3]),
        i: createFakeCard(5, 2, FACTION_NAMES[4]),
        j: createFakeCard(6, 1, FACTION_NAMES[5])
      };

      const result = getManaCurveHighchartsSeries(cards, theme);
      const expected = [
        {
          name: FACTION_NAMES[0],
          showInLegend: false,
          color: 'blue',
          data: [2, 3, 0, 0, 0, 5]
        },
        {
          name: FACTION_NAMES[1],
          showInLegend: false,
          color: 'yellow',
          data: [0, 0, 0, 10, 0, 0]
        },
        {
          name: FACTION_NAMES[2],
          showInLegend: false,
          color: 'red',
          data: [8, 0, 0, 0, 23, 0]
        },
        {
          name: FACTION_NAMES[3],
          showInLegend: false,
          color: 'green',
          data: [0, 0, 0, 0, 0, 10]
        },
        {
          name: FACTION_NAMES[4],
          showInLegend: false,
          color: 'orange',
          data: [0, 5, 0, 0, 0, 0]
        },
        {
          name: FACTION_NAMES[5],
          showInLegend: false,
          color: 'purple',
          data: [6, 0, 0, 0, 0, 0]
        }
      ];

      expect(result).toEqual(expected);
    });
  });
});
