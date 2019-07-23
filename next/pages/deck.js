import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/error-message';
import Deck from '../components/deck';
import Layout from '../components/layout';

export const deckQuery = gql`
  query deck($id: Int!) {
    deck(id: $id) {
      id
      name
    }
  }
`;

export default withRouter(({ router }) => (
  <Layout>
    <Query query={deckQuery} variables={{ id: parseInt(router.query.id) }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <ErrorMessage message={`Error: ${error}`} />;

        return <Deck deck={data.deck} />;
      }}
    </Query>
  </Layout>
));
