import gql from 'graphql-tag';

const deckPreviewsFragment = `
    nodes {
      deckName
      deckCreated
      factions
      essenceCost
      votes
      deck{
        author {
          username
          id
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

export const getDeckSearchVars = vars => {
  return {
    ...vars,
    deckModified: daysAgoToGraphQLTimestamp(vars.updatedTime)
  };
};

// big query for decks advanced search
export const getDeckSearchQuery = () => {
  return gql`
    query decks(
      $deckName: String
      $authorName: String
      $deckModified: Date
      $numCards: Int
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
      $numfactions: Int
    ) {
      searchDecks(
        deckname: $deckName
        authorname: $authorName
        deckmodified: $deckModified
        numcards: $numCards
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
        numfactions: $numfactions
      ) {
        nodes {
          name
          author {
            username
          }
          deckPreviews {
            ${deckPreviewsFragment}
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
        deckPreviews {
          ${deckPreviewsFragment}
        }
      }
    }
  }
`;

export const tourneyDecksQuery = gql`
  query($id: Int!) {
    tournament(id: $id) {
      tournamentDecks(orderBy: RANK_ASC, first: 8) {
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
      ${deckPreviewsFragment}
    }
  }
`;

// converts a deckPreview view to a deck-like object
// for use in components that expect a deck-like
export const deckPreviewToDeck = d => {
  return {
    ...d,
    name: d.deckName,
    author: d.deck.author,
    created: d.deckCreated
  };
};

export const deckPreviewsToDecks = dp => dp.map(deckPreviewToDeck);
