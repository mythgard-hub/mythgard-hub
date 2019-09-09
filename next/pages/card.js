import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';

export const cardQuery = gql`
  query card($id: Int!) {
    card(id: $id) {
      id
      name
      mana
      gem
      atk
      def
      rarity
      supertype
      subtype
      cardFactions {
        nodes {
          faction {
            name
          }
        }
      }
    }
  }
`;

export default withRouter(({ router }) => (
  <Query query={cardQuery} variables={{ id: parseInt(router.query.id, 10) }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return <ErrorMessage message={`Error: ${error}`} />;

      return (
        <Layout
          title={`Mythgard Hub | Cards | ${data.card.name}`}
          desc={`Details and rulings for Mythgard card ${data.card.name}`}
        >
          <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
          <Card card={data.card} />
        </Layout>
      );
    }}
  </Query>
));
