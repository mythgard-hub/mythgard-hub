import gql from 'graphql-tag';

// Creates partial graphql filter(s) for finding card(s) that exist
// in a deck.
//
// Returns an array of gql filter strings
export const getCardFilters = cardIds => {
  if (!cardIds.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return ['{cardDecks: null}'];
  }
  return cardIds.map(cardId => {
    return `{cardDecks: {some: {cardId: {equalTo: ${cardId}}}}}`;
  });
};

// Creates partial graphql filter(s) for finding decks that contain
// cards that are certain factions.
//
// Basically says, "you must have *a* card with this faction in
// your deck. Same with these other factions.  If isOnlyFactions,
// then additionally, no cards in your deck can contain *other*
// factions."
//
// Returns an array of gql filter strings
export const getFactionFilters = (factionNames, isOnlyFactions) => {
  if (!factionNames.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return ['{cardDecks: null}'];
  }
  const factionFilters = factionNames.map(factionName => {
    return `{
      cardDecks: {
          some: {
            card: {
              cardFactions: {
                some: {
                  faction: {
                    name: {
                      in: ["${factionName}"]
                    }
                  }
                }
              }
            }
          }
        }
    }`;
  });
  if (isOnlyFactions) {
    factionFilters.push(`{
      cardDecks: {
          every: {
            card: {
              cardFactions: {
                every: {
                  faction: {
                    name: {
                      in: ["${factionNames.join('","')}"]
                    }
                  }
                }
              }
            }
          }
        }
      }`);
  }
  return factionFilters;
};

// big query for decks advanced search
export const getDeckSearchQuery = (
  cardIds,
  factionNames,
  isOnlyFactions = true
) => {
  const cardFilters = getCardFilters(cardIds);
  const factionFilters = getFactionFilters(factionNames, isOnlyFactions);
  const allAndQueries = [...cardFilters, ...factionFilters];
  return gql`
    query decks($name: String!) {
      decks(
        filter: {
          name: { includesInsensitive: $name },
          and: [${allAndQueries.join(',')}]
        }
      ) {
        nodes {
          name
          id
        }
      }
    }
  `;
};
