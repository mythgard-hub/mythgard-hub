const cdn = `${process.env.MG_CDN}/filters/`;

export const matchPathNameToIcon = pathName => {
  const lowerCaseName = pathName.toLowerCase();

  switch (lowerCaseName) {
    case 'disk of circadia':
      return `${cdn}DiskOfCircadia.png`;
    case 'fires of creation':
      return `${cdn}FiresOfCreation.png`;
    case 'journey of souls':
      return `${cdn}JourneyOfSouls.png`;
    case "rainbow's end":
      return `${cdn}RainbowsEnd.png`;
    case 'turn of seasons':
      return `${cdn}TurnOfSeasons.png`;
    default:
      return null;
  }
};
