import PropTypes from 'prop-types';

export default function Card({ card }) {
  return (
    <div>
      <h1>{card.name}</h1>
      <div>rules: {card.rules}</div>
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.object.isRequired
};
