import gql from 'graphql-tag';

const cardsQuery = gql`
  query cards {
    cards {
      nodes {
        id
        name
        mana
        gem
        color
      }
    }
  }
`;

export default cardsQuery;
