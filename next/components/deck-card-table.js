import PropTypes from 'prop-types';
import GemDot from './gem-dot';

export default function DeckCardsTable({ deck, deleteCard }) {
  const deckCards = deck && Object.values(deck.mainDeck);
  const power = (deck.deckPower && deck.deckPower.name) || '[no power]';
  const path = (deck.deckPath && deck.deckPath.name) || '[no path]';

  return (
    <div className="deck-card-table-container">
      <style jsx>{`
        .deck-card-table-container {
          margin-top: 10px;
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
        .deck-delete-card {
          cursor: pointer;
          text-align: center;
          text-decoration: underline;
        }
      `}</style>
      <div className="deck-title">{deck.deckName || '[untitled]'}</div>
      <table className="deck-card-table">
        <tbody>
          <tr>
            <td colSpan={2}>Path</td>
            <td colSpan={3}>{path}</td>
          </tr>
          <tr>
            <td colSpan={2}>Power</td>
            <td colSpan={3}>{power}</td>
          </tr>
          {deckCards.map(deckCard => (
            <tr key={deckCard.card.id} data-cy="deckCardRow">
              <td>{deckCard.card.mana}</td>
              <td>
                <GemDot gems={deckCard.card.gem} />
              </td>
              <td>{deckCard.card.name}</td>
              <td>x{deckCard.quantity}</td>
              <td
                data-cy="deckDeleteCard"
                className="deck-delete-card"
                onClick={() => deleteCard(deckCard.card.id)}
              >
                x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DeckCardsTable.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  deck: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        mana: PropTypes.number,
        gem: PropTypes.number
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
