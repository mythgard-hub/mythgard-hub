import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

import allCardsQuery from '../lib/queries/all-cards-query';

export default function AllCards(props) {
  const [loading, error, data] = useQuery(allCardsQuery);

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading cards...</div>;

  const cards = data.cards;
  return <CardList onCardClick={props.onCardClick} cards={cards.nodes} />;
}

AllCards.propTypes = {
  onCardClick: PropTypes.func
};
