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
        supertype
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
