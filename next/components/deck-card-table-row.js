import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor, imagePathSmall, formatManaCost } from '../lib/card';
import { cardNameToSlug, firstLetterUppercase } from '../lib/string-utils';
import { getRarityColor } from '../constants/rarities';
import { SUPERTYPE_IMAGES } from '../constants/supertypes.js';

const cdn = process.env.MG_CARDS_CDN;

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
  const cardSlugName = cardNameToSlug(card.name);
  const cardSlug = cardSlugName && `${cdn}/deckslugs/${cardSlugName}.png`;

  if (cardSlug) {
    return (
      <tr key={card.id} data-cy="deckCardRowSlug">
        <style jsx>{`
          .deck-card-quantity {
            background-color: ${theme.cardTableRowQuantityBackground};
            font-size: 1.3em;
            font-style: italic;
            padding: 0 10px;
          }

          .deck-card-slug {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: white;
            background-image: url(${cardSlug});
            background-size: contain;
            background-repeat: no-repeat;
            height: 45px;
          }

          .deck-card-slug span {
            font-size: 1.5rem;
            padding-right: 11px;
            text-shadow: -2px 1px 3px black, -2px 1px 2px black, 0 0 10px black;
          }
        `}</style>
        <td colSpan="3">
          <div className="deck-card-slug">
            <span>{quantity}</span>
          </div>
        </td>
      </tr>
    );
  }

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
          // and reveal the plus and minus buttons
          .deck-card-name:hover .deck-card-link-container::before,
          .deck-card-name:hover .deck-card-plus-minus {
            visibility: visible;
            opacity: 1;
          }
        }
        @media (hover: none) {
          .deck-card-plus-minus {
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
          &times;<span data-cy="deck-builder-card-quantity">{quantity}</span>
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
