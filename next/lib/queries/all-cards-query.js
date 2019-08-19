import gql from 'graphql-tag';

const cardsQuery = gql`
  query cards {
    cards {
      nodes {
        id
        name
        mana
        gem
      }
    }
  }
`;

export default cardsQuery;
