import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const deckPreviewsFragment = `
  deckPreviews {
    nodes {
      deckName
      deckCreated
      factions
      essenceCost
      deck{
        author {
          username
          id
        }
      }
    }
  }`;

// Takes "30" and converts it to an iso string 30 days ago,
// with the time removed. Happens to be a valid database timestamp.
export const daysAgoToGraphQLTimestamp = daysAgoString => {
  const daysAgoInt = parseInt(daysAgoString, 10);
  const daysAgoDate = new Date(Date.now() - daysAgoInt * 1000 * 60 * 60 * 24);
  const isoDate = daysAgoDate.toISOString();
  return isoDate.slice(0, isoDate.indexOf('T'));
};

// [1,2,3] => { card1: 1, card2: 2, card3: 3 }
// yes, this is somewhat demented until we refactor.
const supportedCards = 5;
const cardIdsToVars = ids => {
  const result = {};
  if (!(ids && ids.length)) {
    return result;
  }
  const numCards = Math.min(ids.length, supportedCards);
  for (let i = 0; i < numCards; i++) {
    result[`card${i + 1}`] = ids[i];
  }
  return result;
};

// ['norden', 'aztlan'] => { faction1: 1, faction2: 2, numFactions: 2 }
// yes, this is somewhat demented until we refactor.
const factionIdsMap = {
  norden: 1,
  aztlan: 2,
  oberos: 3,
  dreni: 4,
  parsa: 5,
  harmony: 6
};
const supportedFactions = 6;
const factionNamesToVars = (names, hasOnly) => {
  const result = {};
  if (!(names && names.length)) {
    return result;
  }
  const numFactions = Math.min(names.length, supportedFactions);
  for (let i = 0; i < numFactions; i++) {
    result[`faction${i + 1}`] = factionIdsMap[names[i]];
  }
  if (hasOnly) {
    result.numFactions = numFactions;
  }
  return result;
};

export const getDeckSearchVars = vars => {
  return {
    authorName: vars.authorName,
    deckName: vars.deckName,
    deckModified: daysAgoToGraphQLTimestamp(vars.updatedTime),
    ...cardIdsToVars(vars.cardIds),
    ...factionNamesToVars(vars.factionNames, vars.isOnlyFactions)
  };
};

// big query for decks advanced search
const deckSearchQuery = gql`
    query decks(
      $deckName: String
      $authorName: String
      $deckModified: Date
      $card1: Int
      $card2: Int
      $card3: Int
      $card4: Int
      $card5: Int
      $faction1: Int
      $faction2: Int
      $faction3: Int
      $faction4: Int
      $faction5: Int
      $faction6: Int
      $numFactions: Int
    ) {
      searchDecks(
        deckname: $deckName
        authorname: $authorName
        deckmodified: $deckModified
        card1: $card1
        card2: $card2
        card3: $card3
        card4: $card4
        card5: $card5
        faction1: $faction1
        faction2: $faction2
        faction3: $faction3
        faction4: $faction4
        faction5: $faction5
        faction6: $faction6
        numfactions: $numFactions
      ) {
        nodes {
          name
          author {
            username
          }
          ${deckPreviewsFragment}
        }
      }
    }
  `;

export const useDeckSearchQuery = vars => {
  return useQuery(deckSearchQuery, { variables: getDeckSearchVars(vars) });
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
        ${deckPreviewsFragment}
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

// A view that aggregates facts and stats about a deck
export const newDeckPreviewsQuery = gql`
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_DESC, first: 3) {
      nodes {
        deckName
        deckCreated
        factions
        essenceCost
        deck {
          author {
            username
            id
          }
        }
      }
    }
  }
`;

// converts a deckPreview view to a deck-like object
// for use in components that expect a deck-like
export const deckPreviewToDeck = d => {
  return {
    name: d.deckName,
    factions: d.factions,
    author: d.deck.author,
    created: d.deckCreated,
    essenceCost: d.essenceCost
  };
};

export const deckPreviewsToDecks = dp => dp.map(deckPreviewToDeck);
