const deckPreviewsFragment = `
  nodes {
    deckName
    deckCreated
    factions
    essenceCost
    votes
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
      ${deckPreviewsFragment}
    }
  }
`,
  `
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_DESC, first: 3, filter: {
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
          id
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
  `
];
