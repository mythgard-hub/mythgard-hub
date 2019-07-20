import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';

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
        <>
          <Head>
            <title>Mythgard Hub | Cards | {data.card.name}</title>
            <meta
              name="description"
              content={`Details and rulings for Mythgard card ${data.card.name}.`}
            />
          </Head>
          <Card card={data.card} />
        </>
      );
    }}
  </Query>
));
