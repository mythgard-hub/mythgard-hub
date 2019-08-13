import React from 'react';
import PropTypes from 'prop-types';

export default function CardSelectionItem({ card, onDismissClick }) {
  return (
    <div className="cardSelectionItem" data-cy="cardSelectionItem">
      <button aria-label="Remove card" onClick={e => onDismissClick(e, card)}>
        X
      </button>
      <span>{card.name}</span>
      <style jsx>{`
        .cardSelectionItem {
          display: inline-block;
          border: 1px solid black;
          padding: 5px;
        }

        .cardSelectionItem button {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}

CardSelectionItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onDismissClick: PropTypes.func.isRequired
};
