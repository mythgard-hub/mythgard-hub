import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import Layout from '../components/MyLayout.js';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import PropTypes from 'prop-types';

export const cardByIdQuery = gql`
  query cardById($id: Int!) {
    cardById(id: $id) {
      name
      atk
      def
      rules
    }
  }
`;

const Card = props => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      <div>rules: {props.data.rules}</div>
    </div>
  );
};
Card.proptypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(({ router }) => (
  <div>
    <Query query={cardByIdQuery} variables={{ id: parseInt(router.query.id) }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <ErrorMessage message={`Error: ${error}`} />;

        return <Card data={data.cardById} />;
      }}
    </Query>
  </div>
));
