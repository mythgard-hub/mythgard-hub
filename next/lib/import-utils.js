import { META_KEYS } from '../constants/deck';
import { initializeDeckBuilder } from './deck-utils';

const hasCoverArt = line => {
  return line.startsWith(`${META_KEYS.COVER_ART}:`);
};

// Get the line number where the meta information ends
export const getSpliceIndex = lines => {
  let index = 0;

  while (index < lines.length) {
    const currSplit = lines[index].split(':');

    if (currSplit.length === 1) {
      return index;
    }

    index++;
  }

  return index;
};

// Try to find a meta value. There could be 0-4 meta values
export const extractMetaValue = (lines, metaname) => {
  if (!Array.isArray(lines)) {
    return null;
  }

  try {
    let index = 0;

    while (index < lines.length) {
      const currSplit = lines[index].split(':');

      if (currSplit[0] === metaname && currSplit[1]) {
        return currSplit[1].trim();
      }

      index++;
    }

    return '';
  } catch (e) {
    return null;
  }
};

export const formatCardLines = cardLines => {
  const formatted = cardLines
    .filter(line => line && line.trim && line.trim())
    .map(line => {
      try {
        const split = line.trim().split(' ');

        if (
          !split ||
          !split.length ||
          split.length < 2 ||
          isNaN(parseInt(split[0], 10))
        ) {
          return line;
        }

        return {
          id: 'TBD',
          quantity: parseInt(split[0], 10),
          name: split.slice(1).join(' ')
        };
      } catch (e) {
        return line;
      }
    });

  return formatted;
};

export const metaLineInvalid = (line, metaName) => {
  // Gotta have the basics
  if (!metaName || !line || !line.split) {
    return true;
  }

  const split = line && line.split && line.split(':');

  // The first element of the line has to be the meta name
  if (!split || !split.length || split[0] !== metaName || split[0] === line) {
    return true;
  }

  return false;
};

export const cardLinesValid = lines => {
  return lines.reduce(
    (acc, curr) => Boolean(acc && curr.quantity && curr.name),
    true
  );
};

export const getImportErrors = (mainDeckText, sideboardText) => {
  try {
    const errors = [];

    const mainDeckLines = mainDeckText.split(/\n/);
    const sideboardLines = formatCardLines(sideboardText.split(/\n/));

    // We need at least a card
    if (mainDeckLines.length < 1) {
      errors.push('Deck must have some cards');
      return errors;
    }

    // the export can have a bunch of meta lines.
    // We need to figre out where to start splicing to get the actual cards
    const spliceIndex = getSpliceIndex(mainDeckLines);
    const cardLines = formatCardLines(mainDeckLines.splice(spliceIndex));

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
  } catch (e) {
    return ['Invalid input for main deck'];
  }
};

export const convertImportToDeck = (mainDeckText, sideboardText) => {
  const importedDeck = initializeDeckBuilder();

  importedDeck.errors = getImportErrors(mainDeckText, sideboardText);

  if (importedDeck.errors.length) {
    return importedDeck;
  }

  const mainDeckLines = mainDeckText.split(/\n/g);
  const sideboardLines = sideboardText.split(/\n/g);
  const spliceIndex = getSpliceIndex(mainDeckLines);

  importedDeck.mainDeck = formatCardLines(mainDeckLines.slice(spliceIndex));
  importedDeck.sideboard = formatCardLines(sideboardLines);

  importedDeck.deckName = extractMetaValue(mainDeckLines, META_KEYS.NAME);
  importedDeck.deckPath = extractMetaValue(mainDeckLines, META_KEYS.PATH);
  importedDeck.deckPower = extractMetaValue(mainDeckLines, META_KEYS.POWER);
  importedDeck.deckCoverArt = extractMetaValue(
    mainDeckLines,
    META_KEYS.COVER_ART
  );

  return importedDeck;
};
