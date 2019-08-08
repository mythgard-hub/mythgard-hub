import PropTypes from 'prop-types';

export default function ImportDeck({
  mainDeckInput,
  handleInputChange,
  handleImport
}) {
  return (
    <>
      <h2 data-cy="importDeckTitle">Import Deck</h2>
      <textarea
        data-cy="importDeckTextarea"
        cols="40"
        rows="10"
        value={mainDeckInput}
        name="mainDeckInput"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <button onClick={handleImport} data-cy="importDeckButton">
        Import
      </button>
    </>
  );
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
