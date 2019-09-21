import gql from 'graphql-tag';

export const cardQuery = gql`
  query card($id: Int!) {
    card(id: $id) {
      id
      name
      mana
      gem
      atk
      def
      rarity
      supertype
      subtype
      cardFactions {
        nodes {
          faction {
            name
          }
        }
      }
      cardSpawns {
        nodes {
          spawn {
            name
          }
        }
      }
    }
  }
`;

export default cardQuery;
