import gql from 'graphql-tag';

const powersQuery = gql`
  query powers {
    powers {
      nodes {
        id
        name
        rules
      }
    }
  }
`;

export default powersQuery;
