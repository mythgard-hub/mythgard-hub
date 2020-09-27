import gql from 'graphql-tag';

const cardsQuery = gql`
  query cards {
    cards(condition: { spawnonly: false }) {
      nodes {
        id
        name
        cardset
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
