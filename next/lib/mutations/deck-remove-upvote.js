import gql from 'graphql-tag';

const removeDeckUpvoteMutation = gql`
  mutation removeDeckUpvote($deckVoteId: Int!) {
    deleteDeckVote(input: { id: $deckVoteId }) {
      deckVote {
        id
      }
    }
  }
`;

const removeDeckUpvote = (apolloClient, deckVoteId) => {
  return apolloClient.mutate({
    mutation: removeDeckUpvoteMutation,
    variables: {
      deckVoteId
    }
  });
};

export default removeDeckUpvote;
