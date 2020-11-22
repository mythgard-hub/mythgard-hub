import gql from 'graphql-tag';

export default gql`
  mutation removeDeckFavorite($deckFavoriteId: Int!) {
    deleteDeckFavorite(input: { id: $deckFavoriteId }) {
      deckFavorite {
        id
      }
    }
  }
`;
