import gql from 'graphql-tag';

const allPowersQuery = gql`
  query pathsAndPowers {
    powers {
      nodes {
        id
        name
      }
    }
  }
`;

export default allPowersQuery;
