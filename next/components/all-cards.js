import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

import allCardsQuery from '../lib/queries/all-cards-query';

export default function AllCards(props) {
  const { onCardClick } = props;
  const { loading, error, data } = useQuery(allCardsQuery);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading cards...</div>;
  if (!data || !data.cards) return null;

  const cards = data.cards;
  return <CardList onCardClick={onCardClick} cards={cards.nodes} />;
}

AllCards.propTypes = {
  onCardClick: PropTypes.func
};
