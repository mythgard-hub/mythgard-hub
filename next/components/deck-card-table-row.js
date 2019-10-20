import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor, imagePathMedium, IMAGE_SIZES } from '../lib/card';

export default function DeckCardsTableRow({ card, deleteCard, quantity }) {
  const theme = useContext(ThemeContext);
  const backgroundColor = cardMainColor(card, theme);
  const color = backgroundColor ? theme.cardTableName : 'white';
  const imgPathMedium = imagePathMedium(card.name, card.set || undefined);
  const smallImageWidth = IMAGE_SIZES.smallImageWidthPortrait;

  return (
    <tr key={card.id} data-cy="deckCardRow">
      <style jsx>{`
        td {
          padding: 2px 5px 5px 5px;
          border: 1px solid #03080a;
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

        // bigger version of the image (hidden until hover)
        .imgWrapper::before {
          content: url(${imgPathMedium});
          width: ${IMAGE_SIZES.hoverImageWidth}px;
          position: absolute;
          top: -${IMAGE_SIZES.hoverImageVerticalOffset}px;
          left: -${(IMAGE_SIZES.hoverImageWidth - smallImageWidth) / 2}px;
          z-index: 2;
          opacity: 0;
        }

        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .imgWrapper:hover::before {
            opacity: 1;
            transition-delay: 0.7s;
          }
        }
      `}</style>
      <td>{card.mana < 0 ? 'X' : card.mana}</td>
      <td>
        <GemDot gems={card.gem} />
      </td>
      <td style={{ backgroundColor, color }}>
        <div className="imgWrapper">
          <Link href={`/card?id=${card.id}`}>
            <a className="deck-card-link">{card.name}</a>
          </Link>
        </div>
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
