//prettier-ignore
// eslint-disable-next-line
const jhashcode=s=>{for(var i=0,h;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return h};

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

const queriesWhitelist = [
  `
  query tournaments {
    tournaments(orderBy: DATE_DESC) {
      nodes {
        id
        name
        date
      }
    }
  }
`,
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
  ) {
    createDeck(
      input: {
        deck: {
          name: $name
          pathId: $pathId
          powerId: $powerId
          authorId: $authorId
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
          }
        }
      }
    }
  }
`,

  `
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
`,

  `
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
`,

  `
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
`,

  `
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
`,

  `
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
    }
  }
`,

  `
  query card($id: Int!) {
    card(id: $id) {
      name
      atk
      def
      rules
    }
  }
`
]
  .map(s => s.trim())
  .map(jhashcode);

console.log(queriesWhitelist);
