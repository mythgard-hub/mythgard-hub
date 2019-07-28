export const formatCardLines = cardLines => {
  const formatted = cardLines
    .filter(line => line && line.trim && line.trim())
    .map(line => {
      const trimmed = line && line.trim && line.trim();
      const split = trimmed && trimmed.split && trimmed.split(' ');

      if (
        !split ||
        !split.length ||
        split.length < 2 ||
        isNaN(parseInt(split[0]))
      ) {
        return line;
      }

      return {
        id: 'TBD',
        quantity: parseInt(split[0]),
        name: split.slice(1).join(' ')
      };
    });

  return formatted;
};

export const metaLineInvalid = (line, metaName) => {
  const split = line && line.split && line.split(':');

  return Boolean(
    !metaName ||
      !line ||
      !split ||
      !split.length ||
      split.length !== 2 ||
      !line[0] ||
      !line[0] === metaName ||
      !line[1]
  );
};

export const cardLinesValid = lines => {
  return lines.reduce(
    (acc, curr) => Boolean(acc && curr.quantity && curr.name),
    true
  );
};

export const getImportErrors = (mainDeckText, sideboardText) => {
  const errors = [];

  const mainDeckLines = mainDeckText.split(/\n/);
  const sideboardLines = formatCardLines(sideboardText.split(/\n/));

  // If we don't even have the first 3 lines, go home
  if (mainDeckLines.length < 4) {
    errors.push('Deck must have name, path, power and cards');
    return errors;
  }

  if (metaLineInvalid(mainDeckLines[0], 'name')) {
    errors.push('Deck must have a name');
  }

  if (metaLineInvalid(mainDeckLines[1], 'path')) {
    errors.push('Deck must have a path');
  }

  if (metaLineInvalid(mainDeckLines[2], 'power')) {
    errors.push('Deck must have a power');
  }

  const cardLines = formatCardLines(mainDeckLines.splice(3));

  if (cardLines.length <= 0) {
    errors.push('Deck must have cards');
  }

  if (!cardLinesValid(cardLines)) {
    errors.push('Invalid input for main deck');
  }

  // If sideboard is not empty, it's gotta have good lines too
  if (!cardLinesValid(sideboardLines)) {
    errors.push('Invalid input for sideboard');
  }

  return errors;
};
