import gql from 'graphql-tag';

export default gql`
  mutation favoriteDeck($deckId: Int, $accountId: Int) {
    createDeckFavorite(
      input: { deckFavorite: { deckId: $deckId, accountId: $accountId } }
    ) {
      deckFavorite {
        id
      }
    }
  }
`;
