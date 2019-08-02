import PropTypes from 'prop-types';

export default function ImportedDeckErrors({ importedDeck }) {
  const { errors } = importedDeck;

  if (errors && errors.length) {
    return (
      <div>
        <h2>Imported Deck</h2>
        <div>Some errors have occurred:</div>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
    );
  }

  return null;
}

ImportedDeckErrors.propTypes = {
  importedDeck: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
