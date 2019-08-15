import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CardListItem({ card, onClick }) {
  return (
    <>
      {onClick && (
        <span data-cy="cardListCard" onClick={e => onClick(e, card)}>
          {card.id}. name: {card.name}
        </span>
      )}
      {!onClick && (
        <Link href={`/card?id=${card.id}`}>
          <a data-cy="cardListCard">
            {card.id}. name: {card.name}
          </a>
        </Link>
      )}
    </>
  );
}

CardListItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
};
