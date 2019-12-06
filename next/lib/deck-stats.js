import { FACTION_NAMES, FACTION_COLORS } from '../constants/factions';
import { mainFaction } from './card';
import { X_COST } from '../constants/card';

const FACTION_COLORS_MAP = {};

const factionMainColor = (faction, theme) => {
  if (!FACTION_COLORS_MAP[FACTION_COLORS.blue]) {
    FACTION_COLORS_MAP[FACTION_COLORS.blue] = theme.blueFactionColor;
    FACTION_COLORS_MAP[FACTION_COLORS.yellow] = theme.yellowFactionColor;
    FACTION_COLORS_MAP[FACTION_COLORS.purple] = theme.purpleFactionColor;
    FACTION_COLORS_MAP[FACTION_COLORS.red] = theme.redFactionColor;
    FACTION_COLORS_MAP[FACTION_COLORS.green] = theme.greenFactionColor;
    FACTION_COLORS_MAP[FACTION_COLORS.orange] = theme.orangeFactionColor;
  }
  return FACTION_COLORS_MAP[faction];
};

const initializeManaCostsByFaction = theme => {
  return FACTION_NAMES.reduce((acc, f) => {
    acc[f] = {
      name: f,
      showInLegend: false,
      color: factionMainColor(f, theme),
      data: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6+': 0
      }
    };

    return acc;
  }, {});
};

export const getManaCurveHighchartsSeries = (cards, theme) => {
  const manaCostsByFaction = initializeManaCostsByFaction(theme);

  try {
    Object.values(cards).forEach(c => {
      const { quantity, card } = c;
      const primaryFaction = mainFaction(card);

      let manaCost = card.mana;
      if (manaCost === X_COST) {
        manaCost = '1';
      } else if (manaCost >= 6) {
        manaCost = '6+';
      } else {
        manaCost = manaCost.toString();
      }

      manaCostsByFaction[primaryFaction].data[manaCost] += quantity;
    });
  } catch (e) {
    console.error(e);
  }

  const manaCurveSeries = Object.values(manaCostsByFaction).map(f => ({
    ...f,
    data: Object.values(f.data)
  }));

  return manaCurveSeries;
};
