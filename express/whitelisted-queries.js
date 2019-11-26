const deckPreviewsFragment = `
  nodes {
    deckName
    deckCreated
    factions
    essenceCost
    votes
    deckArchetype
    deckType
    deck{
      id
      author {
        username
        id
      }
    }
  }
`;

// whitespace doesn't matter here.
module.exports = [
  `
  mutation UpdateAccountUsername($accountId: Int!, $username: String!) {
    updateAccount(
      input: {
        id: $accountId
        patch: {
          username: $username
        }
      }
    ) {
      account {
        id
        email
        username
      }
    }
  }
`,
  `
  mutation DeleteDeck($deckId: Int!) {
    deleteDeck(input: { id: $deckId }) {
      deletedDeckNodeId
    }
  }
`,
  `
  mutation CreateCardDeck($deckId: Int!, $cardId: Int!, $quantity: Int!) {
    createCardDeck(
      input: {
        cardDeck: { deckId: $deckId, cardId: $cardId, quantity: $quantity }
      }
    ) {
      cardDeck {
        quantity
        deckId
        cardId
      }
    }
  }
`,

  `
  mutation AddDeck(
    $name: String!
    $pathId: Int
    $powerId: Int
    $authorId: Int
    $archetype: [Deckarchetype]
    $type: [Decktype]
  ) {
    createDeck(
      input: {
        deck: {
          name: $name
          pathId: $pathId
          powerId: $powerId
          authorId: $authorId
          archetype: $archetype
          type: $type
        }
      }
    ) {
      deck {
        id
        name
        author {
          id
          username
        }
        path {
          id
          name
        }
        power {
          id
          name
        }
        archetype
        type
      }
    }
  }
`,

  `
mutation UpdateDeckAndRemoveCards(
    $id: Int!
    $name: String!
    $pathId: Int
    $powerId: Int
    $archetype: [Deckarchetype]
    $type: [Decktype]
  ) {
    updateDeckAndRemoveCards(
      input: {
        _id: $id
        _name: $name
        _pathId: $pathId
        _powerId: $powerId
        _archetype: $archetype
        _type: $type
      }
    ) {
      deck {
        id
        name
        author {
          id
          username
        }
        path {
          id
          name
        }
        power {
          id
          name
        }
        archetype
        type
      }
    }
  }
`,

  `
  query powers {
    powers {
      nodes {
        id
        name
        rules
      }
    }
  }
`,

  `
  query paths {
    paths {
      nodes {
        id
        name
        rules
      }
    }
  }
`,

  `
  query cards {
    cards {
      nodes {
        id
        name
        mana
        gem
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
`,

  `
    query cards(
      $searchText: String
      $rarities: [Rarity!]
      $factionIds: [String!]
      $manaCosts: [Int!]
      $strengths: [Int!]
      $defenses: [Int!]
      $supertypes: [Cardtype]
      $manaGTE: Int
      $strengthGTE: Int
      $defenseGTE: Int
    ) {
      cards(
        filter: {
          and: [
            {
              or: [
                { name: { includesInsensitive: $searchText } }
                { rules: { includesInsensitive: $searchText } }
                { subtype: { includesInsensitive: $searchText } }
              ]
            }
            {
              or: [
                { mana: { in: $manaCosts } }
                { mana: { greaterThanOrEqualTo: $manaGTE } }
              ]
            }
            {
              or: [
                { atk: { in: $strengths } }
                { atk: { greaterThanOrEqualTo: $strengthGTE } }
              ]
            }
            {
              or: [
                { def: { in: $defenses } }
                { def: { greaterThanOrEqualTo: $defenseGTE } }
              ]
            }
          ]
          rarity: { in: $rarities }
          supertype: { containedBy: $supertypes }
          cardFactions: { some: { faction: { name: { in: $factionIds } } } }
        }
      ) {
        nodes {
          name
          id
          mana
          gem
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
  `,

  `
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
`,

  `
  query decks($first:Int, $offset:Int, $modified:Datetime) {
    decks(orderBy: CREATED_DESC, first:$first, offset:$offset, filter: {
      modified: {
        greaterThanOrEqualTo: $modified
      }
    }) {
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
`,

  `
  query deck($id: Int!) {
    deck(id: $id) {
      id
      name
      description
      author {
        id
        username
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
`,

  `
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_DESC, first: 3) {
      ${deckPreviewsFragment}
    }
  }
`,
  `
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_ASC, first: 4, filter: {
      deck: {
        deckFeatureds: {
          some: {
            deckExists: true
          }
        }
      }
    }) {
      ${deckPreviewsFragment}
    }
  }
`,
  `
  query card($id: Int!) {
    card(id: $id) {
      id
      name
      mana
      gem
      atk
      def
      rarity
      supertype
      subtype
      cardFactions {
        nodes {
          faction {
            name
          }
        }
      }
      cardSpawns {
        nodes {
          spawn {
            name
          }
        }
      }
    }
  }
`,
  `
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
  `,
  `
  query userDecks($authorId: Int!) {
    decks(condition: { authorId: $authorId }, orderBy: CREATED_DESC) {
      nodes {
        deckPreviews {
         ${deckPreviewsFragment}
        }
      }
    }
  }
  `,
  // tournaments
  `
query tournaments($now: Date) {
  tournaments(orderBy: DATE_DESC, filter: { date: { lessThan: $now } }) {
    nodes {
      id
      name
      organizer
      date
      url
    }
  }
}
`,
  `
  query tournaments($now: Date) {
    tournaments(
      orderBy: DATE_ASC
      first: 3
      filter: { date: { greaterThanOrEqualTo: $now } }
    ) {
      nodes {
        id
        name
        organizer
        date
        url
      }
    }
  }

`,
  `
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      url
      date
      organizer
      tournamentDecks {
        nodes {
          rank
          pilot
          deck {
            name
            id
            deckPreviews {
              nodes {
                factions
                essenceCost
              }
            }
          }
        }
      }
    }
  }
`,
  `
  query deckAccountVotes($deckId: Int!, $accountId: Int!) {
    deckVotes(
      filter: {
        deckId: { equalTo: $deckId }
        accountId: { equalTo: $accountId }
      }
    ) {
      nodes {
        id
        __typename
      }
      __typename
    }
  }
`,
  `
  mutation upvoteDeck($deckId: Int, $accountId: Int) {
    createDeckVote(
      input: { deckVote: { deckId: $deckId, accountId: $accountId } }
    ) {
      deckVote {
        id
      }
    }
  }
`,
  `
  mutation removeDeckUpvote($deckVoteId: Int!) {
    deleteDeckVote(input: { id: $deckVoteId }) {
      deckVote {
        id
      }
    }
  }
`,
  `
  mutation updateDeck($deckId: Int!, $deckDesc: String, $deckName: String) {
    updateDeck(
      input: {
        id: $deckId
        patch: { description: $deckDesc, name: $deckName }
      }
    ) {
      deck {
        id
      }
    }
  }
`,
  `
  query isModerator($accountId: Int!) {
    accountModerators(condition: { accountId: $accountId }) {
      totalCount
    }
  }
`
];
