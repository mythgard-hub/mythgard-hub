import gql from 'graphql-tag';

const addDeckMutation = gql`
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
`;

const createNewEmptyDeck = (apolloClient, deck, authorId) => {
  const path = (deck.deckPath && deck.deckPath.id) || null;
  const power = (deck.deckPower && deck.deckPower.id) || null;
  const archetype =
    deck.archetype && deck.archetype.length
      ? deck.archetype.toUpperCase().split(' ')
      : null;
  const type =
    deck.type && deck.type.length ? deck.type.toUpperCase().split(' ') : null;

  return apolloClient.mutate({
    mutation: addDeckMutation,
    variables: {
      name: deck.deckName,
      pathId: path,
      powerId: power,
      authorId,
      archetype,
      type
    }
  });
};

export default createNewEmptyDeck;
