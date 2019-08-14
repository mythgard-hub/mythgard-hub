import PropTypes from 'prop-types';
import CardSelectionItem from './card-selection-item';

export default function CardSearchSelections({ onDismissClick, cards }) {
  return (
    <ul className="cardSearchSelections" data-cy="cardSearchSelections">
      {cards.map((card, index) => (
        <li key={card.id ? card.id : index}>
          <CardSelectionItem card={card} onDismissClick={onDismissClick} />
        </li>
      ))}
      <style jsx>{`
        .cardSearchSelections {
          list-style: none;
          padding: 10px 10px 0 10px;
          border: 1px solid black;
          margin: 10px 0 0;
        }
        .cardSearchSelections li {
          margin-bottom: 10px;
        }
      `}</style>
      <style jsx>{`
        .cardSearchSelections {
          display: ${cards.length ? 'inline-block' : 'none'};
        }
      `}</style>
    </ul>
  );
}
CardSearchSelections.propTypes = {
  cards: PropTypes.array.isRequired,
  onDismissClick: PropTypes.func.isRequired
};
