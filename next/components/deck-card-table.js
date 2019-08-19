import PropTypes from 'prop-types';

export default function DeckCardsTable({ deck }) {
  const deckCards = deck && Object.values(deck.mainDeck);

  const drawGems = gem => {
    return Array(gem)
      .fill(0)
      .map((_, i) => <span key={i} className="gem-circle" />);
  };

  return (
    <div className="deck-card-table-container">
      <style jsx>{`
        .deck-card-table-container {
          margin-top: 20px;
          padding: 10px;
        }
        .deck-card-table {
          border-collapse: collapse;
          width: 100%;
        }
        td {
          padding: 2px 5px 5px 5px;
          border: 1px solid #03080a;
        }
        .deck-title {
          font-size: 30px;
          margin: 0 0 20px 5px;
        }
      `}</style>
      <div className="deck-title">{deck.deckName}</div>
      <table className="deck-card-table">
        <tbody>
          <tr>
            <td colSpan={2}>Path</td>
            <td colSpan={3}>{deck.deckPath}</td>
          </tr>
          <tr>
            <td colSpan={2}>Power</td>
            <td colSpan={3}>{deck.deckPower}</td>
          </tr>
          {deckCards.map(deckCard => (
            <tr key={deckCard.card.id}>
              <td>{deckCard.card.mana}</td>
              <td>{drawGems(deckCard.card.gem)}</td>
              <td>{deckCard.card.color}</td>
              <td>{deckCard.card.name}</td>
              <td>x{deckCard.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DeckCardsTable.propTypes = {
  deck: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.string,
    deckPower: PropTypes.string,
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        mana: PropTypes.number,
        gem: PropTypes.number,
        color: PropTypes.string
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
