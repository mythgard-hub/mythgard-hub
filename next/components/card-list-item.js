import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CardListItem({ card, onCardClick }) {
  return (
    <Link href={`/card?id=${card.id}`}>
      <a data-cy="cardListCard" onClick={e => onCardClick(e, card)}>
        {card.id}. name: {card.name}
      </a>
    </Link>
  );
}

CardListItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onCardClick: PropTypes.func
};

CardListItem.defaultProps = {
  onCardClick: () => {}
};
