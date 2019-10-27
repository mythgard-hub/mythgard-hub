import gql from 'graphql-tag';

const upvoteDeckMutation = gql`
  mutation upvoteDeck($deckId: Int, $accountId: Int) {
    createDeckVote(
      input: { deckVote: { deckId: $deckId, accountId: $accountId } }
    ) {
      deckVote {
        id
      }
    }
  }
`;

const upvoteDeck = (apolloClient, deckId, accountId) => {
  return apolloClient.mutate({
    mutation: upvoteDeckMutation,
    variables: {
      deckId,
      accountId
    }
  });
};

export default upvoteDeck;
