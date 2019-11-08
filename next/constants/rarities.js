const cdn = `${process.env.MG_CDN}/filters/`;

export const RARITY_IMAGES = {
  common: `${cdn}Filter-Icons_0000s_0000s_0000_C.png`,
  uncommon: `${cdn}Filter-Icons_0000s_0000s_0001_U.png`,
  rare: `${cdn}Filter-Icons_0000s_0000s_0002_R.png`,
  mythic: `${cdn}Filter-Icons_0000s_0000s_0003_M.png`
};

export const RARITY_MAX_CARDS = {
  common: 4,
  uncommon: 3,
  rare: 2,
  mythic: 1
};

export const RARITY_COLORS = {
  common: '#926950',
  uncommon: '#A5A5A5',
  rare: '#FDF007',
  mythic: '#33A0E0'
};

export const getRarityImage = rarity => {
  if (!rarity) {
    rarity = 'common';
  }
  return RARITY_IMAGES[rarity.toLowerCase()];
};

export const getRarityColor = rarity => {
  if (!rarity) {
    rarity = 'common';
  }
  return RARITY_COLORS[rarity.toLowerCase()];
};
