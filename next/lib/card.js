import { FACTION_COLORS } from '../constants/factions';
const cdn = process.env.MG_CARDS_CDN;

export const IMAGE_SIZES = {
  smallImageWidthPortrait: 160,
  smallImageWidthLandscape: 240,
  hoverImageWidth: 320,
  hoverImageVerticalOffset: 64
};

const capitalize = s => {
  const rest = s.length > 1 ? s.slice(1) : '';
  return `${s[0].toUpperCase()}${rest}`;
};

export const nameToImage = name => {
  name = name
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z -]/gi, '');
  if (!name.length) {
    return '';
  }
  return name
    .split(' ')
    .map(capitalize)
    .join('_')
    .split('-')
    .map(capitalize)
    .join('-');
};

export const imagePathSmall = (name, set = 'core') => {
  return `${cdn}/${set.toLowerCase()}/s/${nameToImage(name)}.png`;
};

export const imagePathMedium = (name, set = 'core') => {
  return `${cdn}/${set.toLowerCase()}/m/${nameToImage(name)}.png`;
};

export const mainFaction = card => {
  try {
    return card.cardFactions.nodes[0].faction.name;
  } catch (e) {
    return null;
  }
};

export const cardMainColor = (card, theme) => {
  const faction = mainFaction(card);

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

export const formatManaCost = card => {
  if (!card || !card.mana) return '';

  return card.mana < 0 ? 'X' : card.mana;
};
