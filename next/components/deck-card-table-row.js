import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor, imagePathSmall, formatManaCost } from '../lib/card';
import { firstLetterUppercase } from '../lib/string-utils';
import { getRarityColor } from '../constants/rarities';
import { SUPERTYPE_IMAGES } from '../constants/supertypes.js';

export default function DeckCardsTableRow({
  deckCard,
  deleteCard,
  increaseCardQuantity,
  decreaseCardQuantity
}) {
  const theme = useContext(ThemeContext);
  const card = deckCard.card;
  const quantity = deckCard.quantity;
  const backgroundColor = cardMainColor(card, theme);
  const color = backgroundColor ? theme.cardTableName : 'white';
  const imagePath = imagePathSmall(card.name, card.set || undefined);
  const supertype = (card.supertype && card.supertype[0]) || '';

  return (
    <tr key={card.id} data-cy="deckCardRow">
      <style jsx>{`
        td {
          border: ${theme.cardTableBorder};
        }
        .deck-card-cost {
          text-align: center;
          width: 25px;
        }
        .deck-card-gems {
          width: 40px;
        }
        .deck-delete-card {
          cursor: pointer;
          text-align: center;
          text-decoration: underline;
          padding: 0 3px;
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
        .deck-card-name {
          display: flex;
          justify-content: space-between;
        }
        .deck-card-link-container {
          position: relative;
          cursor: pointer;
          background-clip: padding-box;
          width: 100%;
          padding: 6px 0 6px 6px;
        }
        // bigger version of the image (hidden until hover)
        .deck-card-link-container::before {
          content: url(${imagePath});
          position: absolute;
          top: 150%;
          left: -5%;
          z-index: 2;
          visibility: hidden;
          opacity: 0;
        }
        .deck-card-quantity {
          width: 30px;
          background-color: ${theme.cardTableRowQuantityBackground};
          font-size: 0.9em;
          font-style: italic;
          padding: 0 4px;
        }
        .deck-card-quantity span {
          display: flex;
          justify-content: center;
        }
        .deck-card-quantity img {
          height: 20px;
          padding: 0 4px 0 0;
        }
        .deck-card-rarity {
          width: 1px;
          padding: 3px;
        }
        .deck-card-plus-minus {
          height: calc(100% + 12px);
          display: flex;
          visibility: hidden;
          opacity: 0;
        }
        .deck-card-plus-minus button {
          padding: 0 8px 4px 8px;
          font-size: 22px;
        }
        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .deck-card-name:hover .deck-card-link-container::before,
          .deck-card-name:hover .deck-card-plus-minus {
            visibility: visible;
            opacity: 1;
          }
        }
      `}</style>
      <td className="deck-card-cost">{formatManaCost(card)}</td>
      <td className="deck-card-gems">
        <GemDot gems={card.gem} />
      </td>
      <td
        className="deck-card-name"
        data-cy="deckCardName"
        style={{ backgroundColor, color }}
      >
        <div className="deck-card-link-container">
          <Link href={`/card?id=${card.id}`}>
            <a className="deck-card-link">{card.name}</a>
          </Link>
        </div>
        {increaseCardQuantity && decreaseCardQuantity && (
          <div className="deck-card-plus-minus">
            <button
              data-cy="deckAddCard"
              onClick={() => increaseCardQuantity(deckCard)}
            >
              +
            </button>
            <button
              data-cy="deckRemoveCard"
              onClick={() => decreaseCardQuantity(deckCard)}
            >
              -
            </button>
          </div>
        )}
      </td>
      <td className="deck-card-quantity">
        <span>
          {card.supertype && (
            <img
              src={SUPERTYPE_IMAGES[supertype.toLowerCase()]}
              className="supertype-icon"
              title={firstLetterUppercase(supertype)}
            />
          )}
          &times;{quantity}
        </span>
      </td>
      <td
        className="deck-card-rarity"
        style={{ backgroundColor: getRarityColor(card.rarity) }}
        title={firstLetterUppercase(card.rarity)}
      ></td>
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
  increaseCardQuantity: PropTypes.func,
  decreaseCardQuantity: PropTypes.func,
  quantity: PropTypes.number,
  deckCard: PropTypes.shape({
    quantity: PropTypes.number,
    card: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      mana: PropTypes.number,
      gem: PropTypes.string,
      set: PropTypes.string,
      supertype: PropTypes.array,
      rarity: PropTypes.string
    })
  })
};
