import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor, imagePathSmall, formatManaCost } from '../lib/card';

export default function DeckCardsTableRow({ card, deleteCard, quantity }) {
  const theme = useContext(ThemeContext);
  const backgroundColor = cardMainColor(card, theme);
  const color = backgroundColor ? theme.cardTableName : 'white';
  const imagePath = imagePathSmall(card.name, card.set || undefined);

  return (
    <tr key={card.id} data-cy="deckCardRow">
      <style jsx>{`
        td {
          padding: 2px 5px 5px 5px;
          border: ${theme.cardTableBorder};
        }
        .deck-delete-card {
          cursor: pointer;
          text-align: center;
          text-decoration: underline;
        }
        .deck-card-link,
        .deck-card-link:hover,
        .deck-card-link:focus {
          color: ${theme.cardTableName};
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.8em;
        }
        .imgWrapper {
          position: relative;
          cursor: pointer;
        }
        // bigger version of the image (hidden until hover)
        .imgWrapper::before {
          content: url(${imagePath});
          position: absolute;
          top: 50%;
          left: 70%;
          z-index: 2;
          visibility: hidden;
          opacity: 0;
        }

        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .imgWrapper:hover::before {
            visibility: visible;
            opacity: 1;
          }
        }
      `}</style>
      <td>{formatManaCost(card)}</td>
      <td>
        <GemDot gems={card.gem} />
      </td>
      <td style={{ backgroundColor, color }} className="imgWrapper">
        <Link href={`/card?id=${card.id}`}>
          <a className="deck-card-link">{card.name}</a>
        </Link>
      </td>
      <td>&times;{quantity}</td>
      {deleteCard && (
        <td
          data-cy="deckDeleteCard"
          className="deck-delete-card"
          onClick={() => deleteCard(card.id)}
        >
          &times;
        </td>
      )}
    </tr>
  );
}

DeckCardsTableRow.propTypes = {
  deleteCard: PropTypes.func,
  quantity: PropTypes.number,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mana: PropTypes.number,
    gem: PropTypes.number
  })
};
