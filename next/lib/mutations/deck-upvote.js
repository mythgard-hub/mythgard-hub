import gql from 'graphql-tag';

export default gql`
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
