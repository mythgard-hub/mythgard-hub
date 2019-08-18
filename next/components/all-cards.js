import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

import allCardsQuery from '../lib/queries/all-cards-query';

export default function AllCards(props) {
  return (
    <Query query={allCardsQuery}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message={error} />;
        if (loading) return <div>Loading</div>;

        const cards = data.cards;
        return <CardList onCardClick={props.onCardClick} cards={cards.nodes} />;
      }}
    </Query>
  );
}
AllCards.propTypes = {
  onCardClick: PropTypes.func
};
