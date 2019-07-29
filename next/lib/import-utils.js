import { META_KEYS } from '../constants/deck';

export const initializeImportedDeck = () => {
  return {
    deckName: '',
    deckPath: '',
    deckPower: '',
    mainDeck: [],
    sideboard: [],
    errors: [],
    asText: ''
  };
};

export const extractMetaValue = line => {
  const split = line && line.split && line.split(':');
  return split
    .slice(1)
    .join(':')
    .trim();
};

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
      split.length < 2 ||
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

  if (metaLineInvalid(mainDeckLines[0], META_KEYS.NAME)) {
    errors.push('Deck must have a name');
  }

  if (metaLineInvalid(mainDeckLines[1], META_KEYS.PATH)) {
    errors.push('Deck must have a path');
  }

  if (metaLineInvalid(mainDeckLines[2], META_KEYS.POWER)) {
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

export const convertImportToDeck = (mainDeckText, sideboardText) => {
  const importedDeck = initializeImportedDeck();

  importedDeck.errors = getImportErrors(mainDeckText, sideboardText);

  if (importedDeck.errors.length) {
    return importedDeck;
  }

  const mainDeckLines = mainDeckText.split(/\n/g);
  const sideboardLines = sideboardText.split(/\n/g);

  importedDeck.deckName = extractMetaValue(mainDeckLines[0]);
  importedDeck.deckPath = extractMetaValue(mainDeckLines[1]);
  importedDeck.deckPower = extractMetaValue(mainDeckLines[2]);
  importedDeck.mainDeck = formatCardLines(mainDeckLines.slice(3));
  importedDeck.sideboard = formatCardLines(sideboardLines);
  importedDeck.asText = mainDeckText;

  return importedDeck;
};
