import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

export const cardsQuery = gql`
  query cards {
    cards {
      nodes {
        id
        name
      }
    }
  }
`;

export default function AllCards(props) {
  return (
    <Query query={cardsQuery}>
      {({ loading, error, data: { cards } }) => {
        if (error) return <ErrorMessage message={error} />;
        if (loading) return <div>Loading</div>;

        return <CardList onCardClick={props.onCardClick} cards={cards.nodes} />;
      }}
    </Query>
  );
}
AllCards.propTypes = {
  onCardClick: PropTypes.func
};
