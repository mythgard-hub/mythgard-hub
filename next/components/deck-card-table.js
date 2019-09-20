import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor } from '../lib/card';

export default function DeckCardsTable({ deck, deleteCard, onlyTable }) {
  const theme = useContext(ThemeContext);
  const deckCards = deck && Object.values(deck.mainDeck);
  const power = (deck.deckPower && deck.deckPower.name) || '[no power]';
  const path = (deck.deckPath && deck.deckPath.name) || '[no path]';
  const colspan = deleteCard ? 3 : 2;

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
        .deck-card-link,
        .deck-card-link:hover,
        .deck-card-link:focus {
          color: ${theme.fontColor};
          text-decoration: none;
        }
      `}</style>
      {!onlyTable && (
        <div className="deck-title">{deck.deckName || '[untitled]'}</div>
      )}
      <table className="deck-card-table" data-cy="deckCardTable">
        <tbody>
          <tr>
            <td colSpan={2}>Path</td>
            <td colSpan={colspan}>{path}</td>
          </tr>
          <tr>
            <td colSpan={2}>Power</td>
            <td colSpan={colspan}>{power}</td>
          </tr>
          {deckCards.map(deckCard => {
            const backgroundColor = cardMainColor(deckCard.card, theme);
            const color = backgroundColor ? theme.cardTableName : 'inherit';
            return (
              <tr key={deckCard.card.id} data-cy="deckCardRow">
                <td>{deckCard.card.mana}</td>
                <td>
                  <GemDot gems={deckCard.card.gem} />
                </td>
                <td style={{ backgroundColor, color }}>
                  <Link href={`/card?id=${deckCard.card.id}`}>
                    <a className="deck-card-link">{deckCard.card.name}</a>
                  </Link>
                </td>
                <td>x{deckCard.quantity}</td>
                {deleteCard && (
                  <td
                    data-cy="deckDeleteCard"
                    className="deck-delete-card"
                    onClick={() => deleteCard(deckCard.card.id)}
                  >
                    &times;
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DeckCardsTable.propTypes = {
  onlyTable: PropTypes.bool,
  deleteCard: PropTypes.func,
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
