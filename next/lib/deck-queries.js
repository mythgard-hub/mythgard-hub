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

// Takes "30" and converts it to an iso string 30 days ago,
// with the time removed. Happens to be a valid database timestamp.
export const daysAgoToGraphQLTimestamp = daysAgoString => {
  const daysAgoInt = parseInt(daysAgoString, 10);
  const daysAgoDate = new Date(Date.now() - daysAgoInt * 1000 * 60 * 60 * 24);
  const isoDate = daysAgoDate.toISOString();
  return isoDate.slice(0, isoDate.indexOf('T'));
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
    query decks($name: String!, $authorName: String, $modifiedOnOrAfter: Datetime!) {
      decks(
        filter: {
          name: { includesInsensitive: $name },
          author: {
            username: {
              includesInsensitive: $authorName
            }
          },
          modified: {
            greaterThanOrEqualTo: $modifiedOnOrAfter
          },
          and: [${allAndQueries.join(',')}]
        }
      ) {
        nodes {
          name
          id
          author {
            username
          }
          modified
          cardDecks {
            nodes {
              quantity
              card {
                mana
                cardFactions {
                  nodes {
                    faction {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
};

export const deckCardsQuery = gql`
  query($id: Int!) {
    deck(id: $id) {
      id
      name
      cardDecks {
        nodes {
          quantity
          card {
            name
            id
          }
        }
      }
    }
  }
`;

export const allDecksQuery = gql`
  query decks {
    decks {
      nodes {
        id
        name
        author {
          username
        }
        modified
        cardDecks {
          nodes {
            quantity
            card {
              mana
              cardFactions {
                nodes {
                  faction {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const tourneyDecksQuery = gql`
  query($id: Int!, $ranks: Int = 8) {
    tournament(id: $id) {
      tournamentDecks(orderBy: RANK_ASC, first: $ranks) {
        nodes {
          rank
          deck {
            id
            name
            author {
              username
            }
          }
        }
      }
    }
  }
`;

export const singleDeckQuery = gql`
  query deck($id: Int!) {
    deck(id: $id) {
      id
      name
      author {
        id
        username
      }
      power {
        name
      }
      path {
        name
      }
    }
  }
`;
