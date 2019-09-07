import gql from 'graphql-tag';

const allPathsQuery = gql`
  query paths {
    paths {
      nodes {
        id
        name
        rules
      }
    }
  }
`;

export default allPathsQuery;
