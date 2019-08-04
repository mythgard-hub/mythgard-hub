import PropTypes from 'prop-types';

export default function ImportDeck({
  mainDeckInput,
  handleInputChange,
  handleImport
}) {
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
