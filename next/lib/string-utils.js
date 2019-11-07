export const firstLetterUppercase = str => {
  try {
    return !str || str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  } catch (e) {
    return '';
  }
};

export const ordinalized = i => {
  try {
    if (!i && i !== 0) return '';

    const j = i % 10,
      k = i % 100;

    if (j == 1 && k != 11) {
      return i + 'st';
    }

    if (j == 2 && k != 12) {
      return i + 'nd';
    }

    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  } catch (e) {
    return '';
  }
};
