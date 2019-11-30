import { FACTION_NAMES, FACTION_COLORS } from '../constants/factions';
import { mainFaction } from './card';

const factionMainColor = (faction, theme) => {
  let color = null;
  switch (faction) {
    case FACTION_COLORS.blue:
      color = theme.blueFactionColor;
      break;
    case FACTION_COLORS.yellow:
      color = theme.yellowFactionColor;
      break;
    case FACTION_COLORS.red:
      color = theme.redFactionColor;
      break;
    case FACTION_COLORS.purple:
      color = theme.purpleFactionColor;
      break;
    case FACTION_COLORS.orange:
      color = theme.orangeFactionColor;
      break;
    case FACTION_COLORS.green:
      color = theme.greenFactionColor;
      break;
  }

  return color;
};

export const getManaCurve = (cards, theme) => {
  const manaCostsByFaction = {};
  FACTION_NAMES.forEach(f => {
    manaCostsByFaction[f] = {
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
  });

  try {
    Object.values(cards).forEach(c => {
      const { quantity, card } = c;
      const primaryFaction = mainFaction(card);
      const manaCost = card.mana >= 6 ? '6+' : card.mana.toString();
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
