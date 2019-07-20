import PropTypes from 'prop-types';

export default function Deck({ deck }) {
  return (
    <div>
      <h1 className="deckName">{deck.name}</h1>
    </div>
  );
}
Deck.propTypes = {
  deck: PropTypes.object.isRequired
};

