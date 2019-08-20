import gql from 'graphql-tag';

const addDeckMutation = gql`
  mutation AddDeck($name: String!, $pathId: Int, $powerId: Int) {
    createDeck(
      input: { deck: { name: $name, pathId: $pathId, powerId: $powerId } }
    ) {
      deck {
        id
        name
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
`;

const createNewEmptyDeck = (apolloClient, deck) => {
  const path = (deck.deckPath && deck.deckPath.id) || null;
  const power = (deck.deckPower && deck.deckPower.id) || null;

  return apolloClient.mutate({
    mutation: addDeckMutation,
    variables: {
      name: deck.deckName,
      pathId: path,
      powerId: power
    }
  });
};

export default createNewEmptyDeck;
