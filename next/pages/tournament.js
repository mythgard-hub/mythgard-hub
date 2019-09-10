import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import Layout from '../components/layout';
import { Query } from 'react-apollo';
import ErrorMessage from '../components/error-message';
import Tournament from '../components/tournament';

const tournamentQuery = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
    }
  }
`;

export default withRouter(({ router }) => {
  const id = parseInt(router.query.id, 10);

  return (
    <Layout>
      <Query query={tournamentQuery} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return <ErrorMessage message={error.message} />;

          return <Tournament tournament={data.tournament} />;
        }}
      </Query>
    </Layout>
  );
});
