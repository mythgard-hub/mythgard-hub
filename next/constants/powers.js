const cdn = `${process.env.MG_CDN}/filters/`;

const powerIcons = {
  foresight: `${cdn}foresight_slug.png`,
  protect: `${cdn}protect_slug.png`,
  impel: `${cdn}impel_slug.png`,
  infuse: `${cdn}infuse_slug.png`,
  reconstruct: `${cdn}reanimate_slug.png`,
  mend: `${cdn}rejuvenate_slug.png`,
  smite: `${cdn}smite_slug.png`
};

export const matchPowerNameToIcon = power => {
  try {
    const powerName = power.name;
    const lowerCaseName = powerName.toLowerCase();
    return powerIcons[lowerCaseName] || null;
  } catch (e) {
    return null;
  }
};
