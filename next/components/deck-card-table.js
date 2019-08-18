import PropTypes from 'prop-types';

export default function DeckCardsTable({ deckCards }) {
  const drawGems = gem => {
    return Array(gem)
      .fill(0)
      .map((_, i) => <span key={i} />);
  };

  return (
    <div>
      <style jsx>{`
        .gem-circle {
          content: ' ';
          height: 5px;
          width: 5px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
        }

        .deck-card-table td {
          border: 1px solid #03080a;
        }
      `}</style>
      <table>
        <tbody>
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
  deckCards: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        mana: PropTypes.number,
        gem: PropTypes.number,
        color: PropTypes.string
      }).isRequired
    })
  ).isRequired
};
