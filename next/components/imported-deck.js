import PropTypes from 'prop-types';
import CardList from './card-list';

export default function ImportedDeck({ importedDeck }) {
  const {
    deckName,
    deckPath,
    deckPower,
    mainDeck,
    sideboard,
    errors
  } = importedDeck;

  if ((!errors || !errors.length) && !deckName && !deckPath && !deckPower) {
    return null;
  }

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

  const sideboardElement =
    sideboard && sideboard.length ? (
      <>
        <h3>Sideboard</h3>
        <CardList cards={sideboard} />
      </>
    ) : null;

  return (
    <div>
      <h2>Imported Deck</h2>
      <div>Name: {deckName}</div>
      <div>Path: {deckPath}</div>
      <div>Power: {deckPower}</div>
      <h3>Main Board</h3>
      <CardList cards={mainDeck} />
      {sideboardElement}
    </div>
  );
}

ImportedDeck.propTypes = {
  importedDeck: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.string,
    deckPower: PropTypes.string,
    mainDeck: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        quantity: PropTypes.number,
        name: PropTypes.string
      })
    ),
    sideboard: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        quantity: PropTypes.number,
        name: PropTypes.string
      })
    ),
    asText: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
