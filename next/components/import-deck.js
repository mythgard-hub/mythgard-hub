import PropTypes from 'prop-types';

export default function ImportDeck({
  mainDeckInput,
  handleInputChange,
  handleImport
}) {
  if (errors && errors.length) {
    return (
      <>
        <h2>Import Deck</h2>
        <textarea
          cols="40"
          rows="10"
          value={mainDeckInput}
          name="mainDeckInput"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button onClick={handleImport}>Import</button>
      </>
    );
  }

  return null;
}

ImportDeck.defaultProps = {
  mainDeckInput: '',
  handleInputChange: () => {},
  handleImport: () => {}
};

ImportDeck.propTypes = {
  mainDeckInput: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleImport: PropTypes.func
};
