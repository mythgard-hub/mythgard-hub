import gql from 'graphql-tag';

const cardsQuery = gql`
  query cards {
    cards {
      nodes {
        id
        name
        mana
        gem
        rarity
        cardFactions {
          nodes {
            faction {
              name
            }
          }
        }
      }
    }
  }
`;

export default cardsQuery;
