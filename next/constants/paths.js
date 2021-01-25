const cdn = `${process.env.MG_CDN}/filters/`;

const pathIcons = {
  'disk of circadia': `${cdn}DiskOfCircadia.png`,
  'fires of creation': `${cdn}FiresOfCreation.png`,
  'journey of souls': `${cdn}JourneyOfSouls.png`,
  "rainbow's end": `${cdn}RainbowsEnd.png`,
  'turn of seasons': `${cdn}TurnOfSeasons.png`,
  'coliseum of strife': `${cdn}ColiseumOfStrife.png`,
  'alliance command center': `${cdn}Alliance Command Center.png`,
  'rebellion safehouse': `${cdn}Rebellion Safehouse.png`
};

export const matchPathToIcon = path => matchPathNameToIcon(path && path.name);

export const matchPathNameToIcon = pathName => {
  try {
    const lowerCaseName = pathName.toLowerCase();
    return pathIcons[lowerCaseName] || null;
  } catch (e) {
    return null;
  }
};
