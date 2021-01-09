import { useQuery } from '@apollo/client';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';
import { cardSort } from '../lib/card.js';

import allCardsQuery from '../lib/queries/all-cards-query';

export default function AllCards({ onCardClick }) {
  const { loading, error, data } = useQuery(allCardsQuery);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading cards...</div>;
  if (!data || !data.cards) return null;

  const sortedNodes = [...data.cards.nodes].sort(cardSort);

  return <CardList onCardClick={onCardClick} cards={sortedNodes} />;
}

AllCards.propTypes = {
  onCardClick: PropTypes.func
};
