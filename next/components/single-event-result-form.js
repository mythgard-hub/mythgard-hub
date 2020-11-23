import PropTypes from 'prop-types';

export default function SingleEventResultForm({ onSave, existingResult = {} }) {
  return (
    <div>
      <button onClick={onSave}>Save Event Result</button>
    </div>
  );
}

SingleEventResultForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  existingResult: PropTypes.shape({
    rank: PropTypes.number,
    pilot: PropTypes.string,
    deckId: PropTypes.number
  })
};
