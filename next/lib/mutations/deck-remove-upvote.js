import gql from 'graphql-tag';

export default gql`
  mutation removeDeckUpvote($deckVoteId: Int!) {
    deleteDeckVote(input: { id: $deckVoteId }) {
      deckVote {
        id
      }
    }
  }
`;
