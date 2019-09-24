const cdn = `${process.env.MG_CDN}/filters/`;

export const RARITY_IMAGES = {
  common: `${cdn}Filter-Icons_0000s_0000s_0000_C.png`,
  uncommon: `${cdn}Filter-Icons_0000s_0000s_0001_U.png`,
  rare: `${cdn}Filter-Icons_0000s_0000s_0002_R.png`,
  mythic: `${cdn}Filter-Icons_0000s_0000s_0003_M.png`
};

export const getRarityImage = rarity => {
  if (!rarity) {
    rarity = 'common';
  }
  return RARITY_IMAGES[rarity.toLowerCase()];
};
