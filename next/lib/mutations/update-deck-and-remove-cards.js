import gql from 'graphql-tag';
import { singleDeckQuery } from '../deck-queries';

const updateDeckAndRemoveCardsMutation = gql`
  mutation UpdateDeckAndRemoveCards(
    $id: Int!
    $name: String!
    $pathId: Int
    $powerId: Int
  ) {
    updateDeckAndRemoveCards(
      input: { _id: $id, _name: $name, _pathId: $pathId, _powerId: $powerId }
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
`;

const updateDeckAndRemoveCards = (apolloClient, deckId, deck) => {
  const name = deck.deckName;
  const path = (deck.deckPath && deck.deckPath.id) || null;
  const power = (deck.deckPower && deck.deckPower.id) || null;

  return apolloClient.mutate({
    mutation: updateDeckAndRemoveCardsMutation,
    variables: {
      id: deckId,
      name: name,
      pathId: path,
      powerId: power
    },
    refetchQueries: [
      {
        query: singleDeckQuery,
        variables: { id: deckId }
      }
    ]
  });
};

export default updateDeckAndRemoveCards;
