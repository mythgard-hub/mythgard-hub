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
    .map(s => {
      const rest = s.length > 1 ? s.slice(1) : '';
      return `${s[0].toUpperCase()}${rest}`;
    })
    .join('_')
    .split('-')
    .map(s => {
      const rest = s.length > 1 ? s.slice(1) : '';
      return `${s[0].toUpperCase()}${rest}`;
    })
    .join('-');
};
