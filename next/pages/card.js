import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';
import Layout from '../components/Layout';

export const cardQuery = gql`
  query card($id: Int!) {
    card(id: $id) {
      name
      atk
      def
      rules
    }
  }
`;

export default withRouter(({ router }) => (
  <Query query={cardQuery} variables={{ id: parseInt(router.query.id) }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return <ErrorMessage message={`Error: ${error}`} />;

      return (
        <Layout
          title={`Mythgard Hub | Cards | ${data.card.name}`}
          desc={`Details and rulings for Mythgard card ${data.card.name}`}
        >
          <Card card={data.card} />
        </Layout>
      );
    }}
  </Query>
));
