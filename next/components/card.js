import PropTypes from 'prop-types';

export default function Card({ card }) {
  return (
    <div>
      <h1 data-cy="cardName" className="cardName">
        {card.name}
      </h1>
      <div data-cy="cardRules">rules: {card.rules}</div>
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.object.isRequired
};
