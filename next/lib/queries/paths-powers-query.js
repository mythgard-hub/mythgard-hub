import gql from 'graphql-tag';

const pathsAndPowersQuery = gql`
  query pathsAndPowers {
    paths {
      nodes {
        id
        name
      }
    }
    powers {
      nodes {
        id
        name
      }
    }
  }
`;

export default pathsAndPowersQuery;
