import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

import cardsQuery from '../graphql/cardsQuery';

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
