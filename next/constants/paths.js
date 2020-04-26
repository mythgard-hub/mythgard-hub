const cdn = `${process.env.MG_CDN}/filters/`;

const pathIcons = {
  'disk of circadia': `${cdn}DiskOfCircadia.png`,
  'fires of creation': `${cdn}FiresOfCreation.png`,
  'journey of souls': `${cdn}JourneyOfSouls.png`,
  "rainbow's end": `${cdn}RainbowsEnd.png`,
  'turn of seasons': `${cdn}TurnOfSeasons.png`
};

export const matchPathNameToIcon = path => {
  try {
    const pathName = path.name;
    const lowerCaseName = pathName.toLowerCase();
    return pathIcons[lowerCaseName] || null;
  } catch (e) {
    return null;
  }
};
