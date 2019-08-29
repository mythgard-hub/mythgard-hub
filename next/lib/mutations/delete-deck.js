import gql from 'graphql-tag';

const deleteDeckMutation = gql`
  mutation DeleteDeck($deckId: Int!) {
    deleteDeck(input: { id: $deckId }) {
      deletedDeckNodeId
    }
  }
`;

const deleteDeck = (apolloClient, deckId) => {
  return apolloClient.mutate({
    mutation: deleteDeckMutation,
    variables: {
      deckId
    }
  });
};

export default deleteDeck;
