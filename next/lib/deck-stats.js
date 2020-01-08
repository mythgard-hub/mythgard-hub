import { FACTION_NAMES, FACTION_COLORS } from '../constants/factions';
import { RARITY_IMAGES } from '../constants/rarities';
import { SUPERTYPE_IMAGES } from '../constants/supertypes';
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

export const getRarityCounts = cards => {
  const rarityCounts = {
    COMMON: {
      count: 0,
      link: RARITY_IMAGES.common
    },
    UNCOMMON: {
      count: 0,
      link: RARITY_IMAGES.uncommon
    },
    RARE: {
      count: 0,
      link: RARITY_IMAGES.rare
    },
    MYTHIC: {
      count: 0,
      link: RARITY_IMAGES.mythic
    }
  };

  try {
    Object.values(cards).forEach(c => {
      const { quantity, card } = c;
      if (card.rarity) {
        rarityCounts[card.rarity].count += quantity;
      }
    });
  } catch (e) {
    console.error(e);
  }

  return Object.values(rarityCounts);
};

export const getTypeCounts = cards => {
  const typeCounts = {
    MINION: {
      count: 0,
      link: SUPERTYPE_IMAGES.minion
    },
    SPELL: {
      count: 0,
      link: SUPERTYPE_IMAGES.spell
    },
    ENCHANTMENT: {
      count: 0,
      link: SUPERTYPE_IMAGES.enchantment
    },
    ARTIFACT: {
      count: 0,
      link: SUPERTYPE_IMAGES.artifact
    }
  };

  try {
    Object.values(cards).forEach(c => {
      const { quantity, card } = c;
      if (card.supertype && card.supertype.length) {
        const supertype = card.supertype[0];
        typeCounts[supertype].count += quantity;
      }
    });
  } catch (e) {
    console.error(e);
  }

  return Object.values(typeCounts);
};
