import React from 'react';
import PropTypes from 'prop-types';

export default function CardSelectionItem({ card, onDismissClick }) {
  return (
    <li className="cardSelectionItem" data-cy="cardSelectionItem">
      <style jsx>{`
        .cardSelectionItem {
          display: flex;
          padding: 5px;
        }
        .cardSelectionItem span {
          width: fit-content;
        }
        .cardSelectionItem button {
          margin-right: 10px;
          background-color: unset;
          border: none;
          padding: 0 0 0 30px;
          width: fit-content;
        }
      `}</style>
      <span>{card.name}</span>
      <button aria-label="Remove card" onClick={e => onDismissClick(e, card)}>
        X
      </button>
    </li>
  );
}

CardSelectionItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onDismissClick: PropTypes.func.isRequired
};
