const cdn = process.env.MG_CARDS_CDN;

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
