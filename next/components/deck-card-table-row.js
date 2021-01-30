import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import { imagePathSmall, imagePathSlug } from '../lib/card';

export default function DeckCardsTableRow({
  deckCard,
  deleteCard,
  increaseCardQuantity,
  decreaseCardQuantity
}) {
  const theme = useContext(ThemeContext);
  const card = deckCard.card;
  const quantity = deckCard.quantity;
  const imagePath = imagePathSmall(card.name, card.set || undefined);
  const cardSlug = imagePathSlug(card.name);

  return (
    <div key={card.id} className="deck-card-row" data-cy="deckCardRow">
      <style jsx>{`
        .deck-card-row {
          display: flex;
        }
        .deck-card-plus-minus {
          position: absolute;
          right: 50px;
          display: flex;
          align-items: center;
          opacity: 0;
          visibility: hidden;
        }
        .deck-card-plus-minus button {
          margin-left: 5px;
          padding: 0 10px;
          height: 30px;
        }
        .deck-card-quantity {
          background-color: ${theme.cardTableRowQuantityBackground};
          font-size: 1.3em;
          font-style: italic;
          padding: 0 10px;
        }
        .deck-card-slug-container {
          height: 40px;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
        }
        .deck-card-slug-image {
          height: 40px;
          min-width: 297.5px;
          width: 297.5px;
        }
        // bigger version of the image (hidden until hover)
        .deck-card-slug-container::before {
          content: url(${imagePath});
          position: absolute;
          top: 110%;
          left: 5%;
          z-index: 2;
          visibility: hidden;
          opacity: 0;
        }
        .deck-card-slug span {
          font-size: 1.5rem;
          text-shadow: -2px 1px 3px black, -2px 1px 2px black, 0 0 10px black;
          position: relative;
          width: 15px;
          right: 21px;
        }
        .deck-delete-card {
          cursor: pointer;
          text-decoration: underline;
          padding: 5px 10px;
          font-size: 1.3em;
        }
        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .deck-card-slug:hover .deck-card-slug-container::before,
          .deck-card-slug:hover .deck-card-plus-minus {
            visibility: visible;
            opacity: 1;
          }
        }
      `}</style>
      <Link href={`/card?id=${card.id}`}>
        <div className="deck-card-slug">
          <div className="deck-card-slug-container">
            <a data-cy="deckCardLink">
              <img
                data-cy="deckCardSlugImage"
                className="deck-card-slug-image"
                src={cardSlug}
                alt={card.name}
              />
            </a>
            {increaseCardQuantity && decreaseCardQuantity && (
              <div className="deck-card-plus-minus">
                <button
                  data-cy="deckAddCard"
                  onClick={e => {
                    e.stopPropagation();
                    increaseCardQuantity(deckCard);
                  }}
                >
                  +
                </button>
                <button
                  data-cy="deckRemoveCard"
                  onClick={e => {
                    e.stopPropagation();
                    decreaseCardQuantity(deckCard);
                  }}
                >
                  -
                </button>
              </div>
            )}
            <span
              data-cy="deckCardQuantity"
              className="deck-card-slug-quantity"
            >
              {quantity}
            </span>
          </div>
        </div>
      </Link>
      {deleteCard && (
        <div
          colSpan="1"
          data-cy="deckDeleteCard"
          className="deck-delete-card"
          onClick={() => deleteCard(card.id)}
        >
          &times;
        </div>
      )}
    </div>
  );
}

DeckCardsTableRow.propTypes = {
  deleteCard: PropTypes.func,
  increaseCardQuantity: PropTypes.func,
  decreaseCardQuantity: PropTypes.func,
  deckCard: PropTypes.shape({
    quantity: PropTypes.number,
    card: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  })
};
