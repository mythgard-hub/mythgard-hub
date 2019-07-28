import PropTypes from 'prop-types';
import CardList from './card-list';

export default function ImportedDeck({ importedDeck }) {
  const { deckName, deckPath, deckPower, mainDeck, sideboard } = importedDeck;

  if (importedDeck.errors && importedDeck.errors.length) {
    return (
      <div>
        <h2>Imported Deck</h2>
        <div>Some errors have occurred:</div>
        {importedDeck.errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Imported Deck</h2>
      <div>Name: {deckName}</div>
      <div>Path: {deckPath}</div>
      <div>Path: {deckPower}</div>
      <h3>Main Board</h3>
      <CardList cards={mainDeck} />
      <h3>Sideboard</h3>
      <CardList cards={sideboard} />
    </div>
  );
}
ImportedDeck.propTypes = {
  importedDeck: PropTypes.object
};
