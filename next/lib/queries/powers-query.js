import gql from 'graphql-tag';

const allPowersQuery = gql`
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

export default allPowersQuery;
