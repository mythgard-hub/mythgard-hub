const cdn = `${process.env.MG_CDN}/filters/`;

const powerIcons = {
  foresight: `${cdn}foresight_slug.png`,
  protect: `${cdn}protect_slug.png`,
  impel: `${cdn}impel_slug.png`,
  infuse: `${cdn}infuse_slug.png`,
  reconstruct: `${cdn}reanimate_slug.png`,
  mend: `${cdn}rejuvenate_slug.png`,
  smite: `${cdn}smite_slug.png`,
  bolser: `${cdn}Bolster.png`,
  erode: `${cdn}Erode.png`
};

export const matchPowerToIcon = power =>
  matchPowerNameToIcon(power && power.name);

export const matchPowerNameToIcon = powerName => {
  try {
    const lowerCaseName = powerName.toLowerCase();
    return powerIcons[lowerCaseName] || null;
  } catch (e) {
    return null;
  }
};
