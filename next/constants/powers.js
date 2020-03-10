const cdn = `${process.env.MG_CDN}/filters/`;

export const matchPowerNameToIcon = powerName => {
  const lowerCaseName = powerName.toLowerCase();

  switch (lowerCaseName) {
    case 'foresight':
      return `${cdn}foresight_slug.png`;
    case 'protect':
      return `${cdn}protect_slug.png`;
    case 'impel':
      return `${cdn}impel_slug.png`;
    case 'infuse':
      return `${cdn}infuse_slug.png`;
    case 'reconstruct':
      return `${cdn}reanimate_slug.png`;
    case 'mend':
      return `${cdn}mend.png`;
    case 'smite':
      return `${cdn}smite_slug.png`;
    default:
      return null;
  }
};
