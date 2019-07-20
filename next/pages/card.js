import { withRouter } from 'next/router';
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

      return <Card card={data.card} />;
    }}
  </Query>
));
