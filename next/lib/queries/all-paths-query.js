import gql from 'graphql-tag';

const pathsQuery = gql`
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

export default pathsQuery;
