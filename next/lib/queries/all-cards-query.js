import gql from 'graphql-tag';

const cardsQuery = gql`
  query cards {
    cards {
      nodes {
        id
        name
      }
    }
  }
`;

export default cardsQuery;
