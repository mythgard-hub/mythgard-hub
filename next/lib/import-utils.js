import { META_KEYS } from '../constants/deck';
import { initializeDeckBuilder, getQuantity } from './deck-utils';
import { latinise } from '../lib/string-normalizer';

// Get the line number where the meta information ends
export const getSpliceIndex = lines => {
  let index = 0;

  while (index < lines.length) {
    if (lines[index].indexOf(':') === -1) {
      return index;
    }

    index++;
  }

  return index;
};

// Try to find a meta value. There could be 0-4 meta values
export const extractMetaValue = (lines, metaname, metaValues) => {
  if (!Array.isArray(lines)) {
    return null;
  }

  try {
    let index = 0;

    while (index < lines.length) {
      const currSplit = lines[index].split(':');

      if (
        currSplit[0].toLowerCase() === metaname.toLowerCase() &&
        currSplit[1]
      ) {
        const metaValue = currSplit[1].trim();

        if (metaValues) {
          const dbMetaValue = metaValues.find(
            m => m.name.toLowerCase() === metaValue.toLowerCase()
          );
          return dbMetaValue || null;
        }

        return metaValue;
      }

      index++;
    }

    return null;
  } catch (e) {
    return null;
  }
};

export const formatCardLines = (cardLines, allCards) => {
  const formatted = cardLines
    .filter(line => line && line.trim && line.trim())
    .map(line => {
      try {
        const split = line.trim().split(' ');
        const lineCardName = latinise(
          split
            .slice(1)
            .join(' ')
            .toLowerCase()
            .trim()
        );
        const lineCardQuantity = parseInt(split[0], 10);

        // Make sure the line has a valid format
        if (
          !split ||
          !split.length ||
          split.length < 2 ||
          isNaN(lineCardQuantity)
        ) {
          return line;
        }

        // make sure this card exists in our database and get its ID
        const existingCard = allCards.find(c => {
          return latinise(c.name.toLowerCase()) === lineCardName;
        });

        // If the card doesn't exist, we'll just get rid of it
        // but won't destroy the rest of the import,
        // unless told otherwise
        if (!existingCard) {
          return null;
        }

        return {
          quantity: lineCardQuantity,
          card: { ...existingCard }
        };
      } catch (e) {
        return line;
      }
    });

  return formatted.filter(f => f);
};

export const metaLineInvalid = (line, metaName) => {
  // Gotta have the basics
  if (!metaName || !line || !line.split) {
    return true;
  }

  const split = line.split(':');

  // The first element of the line has to be the meta name
  return !split || !split.length || split[0] !== metaName || split[0] === line;
};

export const cardLinesValid = lines => {
  return lines.reduce(
    (acc, curr) => Boolean(acc && curr.quantity && curr.card),
    true
  );
};

export const getImportErrors = (mainDeckText, sideboardText, allCards) => {
  try {
    const errors = [];

    const mainDeckLines = mainDeckText.split(/\n/);
    const sideboardLines = formatCardLines(sideboardText.split(/\n/), allCards);

    // We need at least a card
    if (mainDeckLines.length < 1) {
      errors.push('Deck must have some cards');
      return errors;
    }

    // the export can have a bunch of meta lines.
    // We need to figre out where to start splicing to get the actual cards
    const spliceIndex = getSpliceIndex(mainDeckLines);
    const cardLines = formatCardLines(
      mainDeckLines.splice(spliceIndex),
      allCards
    );

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

export const convertImportToDeck = (
  mainDeckText,
  sideboardText,
  allCards,
  allPaths,
  allPowers
) => {
  const importedDeck = initializeDeckBuilder();

  importedDeck.errors = getImportErrors(mainDeckText, sideboardText, allCards);

  if (importedDeck.errors.length) {
    return importedDeck;
  }

  const mainDeckLines = mainDeckText.split(/\n/g);
  const sideboardLines = sideboardText.split(/\n/g);
  const spliceIndex = getSpliceIndex(mainDeckLines);

  importedDeck.mainDeck = formatCardLines(
    mainDeckLines.slice(spliceIndex),
    allCards
  ).reduce((acc, curr) => {
    const id = `${curr.card.id}`;
    const quantity = getQuantity(
      curr.card,
      (acc[id] && acc[id].quantity) || 0,
      curr.quantity
    );

    acc[id] = {
      quantity,
      card: curr.card
    };

    return acc;
  }, {});
  importedDeck.sideboard = formatCardLines(sideboardLines, allCards);

  importedDeck.deckName = extractMetaValue(mainDeckLines, META_KEYS.NAME);
  importedDeck.deckPath = extractMetaValue(
    mainDeckLines,
    META_KEYS.PATH,
    allPaths
  );
  importedDeck.deckPower = extractMetaValue(
    mainDeckLines,
    META_KEYS.POWER,
    allPowers
  );
  importedDeck.deckCoverArt = extractMetaValue(
    mainDeckLines,
    META_KEYS.COVER_ART
  );

  return importedDeck;
};
