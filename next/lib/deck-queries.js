import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { formatDate } from './graphql-utils.js';

const deckPreviewsFragment = `
    nodes {
      deckName
      deckCreated
      factions
      essenceCost
      votes
      deckArchetype
      deckType
      pathName
      powerName
      views
      deck{
        id
        author {
          username
          id
          accountType
          profileIconId
        }
      }
  }`;

// Takes "30" and converts it to an iso string 30 days ago,
// with the time removed. Happens to be a valid database timestamp.
export const daysAgoToGraphQLTimestamp = daysAgoString => {
  const daysAgoInt = parseInt(daysAgoString, 10);
  const daysAgoDate = new Date(Date.now() - daysAgoInt * 1000 * 60 * 60 * 24);
  return formatDate(daysAgoDate);
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
    first: vars.first,
    offset: vars.offset,
    deckName: vars.deckName,
    authorName: vars.authorName,
    archetype: vars.archetype,
    type: vars.type,
    pathName: vars.pathName,
    powerName: vars.powerName,
    sortBy: vars.sortBy,
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
      $archetype: [Deckarchetype]
      $type: [Decktype]
      $pathName: String
      $powerName: String
      $first: Int
      $offset: Int
      $sortBy: String
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
        archetypefilter: $archetype
        typefilter: $type
        pathname: $pathName
        powername: $powerName
        first: $first
        offset: $offset
        sortby: $sortBy
      ) {
        totalCount
        nodes {
          id
          name
          author {
            username
          }
          modified
          deckPreviews {
            ${deckPreviewsFragment}
          }
        }
      }
    }
  `;

export const useDeckSearchQuery = (vars, onCompleted) => {
  const variables = getDeckSearchVars(vars);
  return useQuery(deckSearchQuery, {
    variables,
    onCompleted
  });
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
            mana
            gem
            supertype
            rarity
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
`;

export const allDecksQuery = gql`
  query allDecks($first: Int, $offset: Int, $modified: Datetime) {
    deckPreviews(
      orderBy: HOTNESS_DESC
      first: $first
      offset: $offset
      filter: { deckModified: { greaterThanOrEqualTo: $modified } }
    ) {
      totalCount
      nodes {
        deckId
        deckName
        username
        accountId
        accountType
        profileIconId
        deckModified
        deckCreated
        factions
        essenceCost
        votes
        deckArchetype
        deckType
        pathName
        powerName
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
      description
      author {
        id
        username
        accountType
        profileIconId
      }
      power {
        id
        name
      }
      path {
        id
        name
      }
      deckPreviews {
        ${deckPreviewsFragment}
      }
    }
  }
`;

// A view that aggregates facts and stats about a deck
export const newDeckPreviewsQuery = gql`
  query newestDecks {
    deckPreviews(orderBy: DECK_CREATED_DESC, first: 4) {
      ${deckPreviewsFragment}
    }
  }
`;

export const userNewestDecksQuery = gql`
  query userNewestDecks($userId: Int!, $limit: Int!) {
    deckPreviews(condition: { accountId: $userId }, orderBy: DECK_CREATED_DESC, first: $limit) {
      ${deckPreviewsFragment}
      totalCount
    }
  }
`;

export const userTopDecksQuery = gql`
  query userTopDecks($userId: Int!, $limit: Int!) {
    deckPreviews(
      condition: { accountId: $userId }
      orderBy: VOTES_DESC
      first: $limit
    ) {
      ${deckPreviewsFragment}
      totalCount
    }
  }
`;

export const userDecksQuery = gql`
  query userDecks($authorId: Int!) {
    decks(condition: { authorId: $authorId }, orderBy: CREATED_DESC) {
      nodes {
        deckPreviews {
         ${deckPreviewsFragment}
        }
      }
    }
  }
`;

// converts a deckPreview view to a deck-like object
// for use in components that expect a deck-like
export const deckPreviewToDeck = d => {
  return {
    ...d,
    id: d.deck.id,
    name: d.deckName,
    author: d.deck.author,
    created: d.deckCreated
  };
};

export const topDeckPreviewsQuery = gql`
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_ASC, first: 4, filter: {
      deck: {
        deckFeaturedByDeckIdExists: true
      }
    }) {
      ${deckPreviewsFragment}
    }
  }
`;

export const deckPreviewsToDecks = dp => dp.map(deckPreviewToDeck);

export const updateDeck = gql`
  mutation updateDeck($deckId: Int!, $deckDesc: String, $deckName: String) {
    updateDeck(
      input: { id: $deckId, patch: { description: $deckDesc, name: $deckName } }
    ) {
      deck {
        id
      }
    }
  }
`;

export const increaseDeckViews = gql`
  mutation increaseDeckViews($deckId: Int!) {
    increaseDeckViews(input: { _deckId: $deckId }) {
      integer
    }
  }
`;

export const deckFeaturedQuery = gql`
  query deckFeatured {
    deckFeatureds {
      nodes {
        id
        deckId
      }
    }
  }
`;

export const deleteFeaturedDeckMutation = gql`
  mutation deleteFeaturedDeck($id: Int!) {
    deleteDeckFeatured(input: { id: $id }) {
      deckFeatured {
        id
      }
    }
  }
`;

export const addFeaturedDeckMutation = gql`
  mutation addFeaturedDeck($deckId: Int!) {
    createDeckFeatured(input: { deckFeatured: { deckId: $deckId } }) {
      deckFeatured {
        deckId
        id
      }
    }
  }
`;

export const pathPowerQuery = gql`
  query pathPowerQuery {
    paths {
      nodes {
        id
        name
      }
    }
    powers {
      nodes {
        id
        name
      }
    }
  }
`;
