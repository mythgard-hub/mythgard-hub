export const firstLetterUppercase = str => {
  try {
    return !str || str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  } catch (e) {
    return '';
  }
};
