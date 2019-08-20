import gql from 'graphql-tag';

const allPathsQuery = gql`
  query pathsAndPowers {
    paths {
      nodes {
        id
        name
      }
    }
  }
`;

export default allPathsQuery;
