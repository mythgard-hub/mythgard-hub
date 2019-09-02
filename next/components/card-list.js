import { useState } from 'react';
import PropTypes from 'prop-types';
import CardListItem from './card-list-item';

const DEFAULT_PAGE_SIZE = 20;

export default function CardList({ onCardClick, cards, pageSize }) {
  pageSize = pageSize || DEFAULT_PAGE_SIZE;
  const [currentPage, setPage] = useState(0);
  const min = currentPage * pageSize;
  const max = (currentPage + 1) * pageSize - 1;

  const showNext = cards.length - 1 > max;
  const showPrev = currentPage > 0;

  return (
    <>
      <ul className="cardList" data-cy="cardList">
        {cards.map((card, index) => {
          if (index < min || index > max) {
            return;
          }
          return (
            <li key={card.id ? card.id : index}>
              <CardListItem card={card} onClick={onCardClick} />
            </li>
          );
        })}
      </ul>
      <div className="mg-paging">
        <style jsx>{`
          .mg-paging {
            display: flex;
          }
          .mg-paging button {
            max-width: 100px;
          }
        `}</style>
        <button
          className="mgPrevious"
          disabled={!showPrev}
          onClick={() => setPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{currentPage + 1}</span>
        <button
          disabled={!showNext}
          className="mgNext"
          onClick={() => setPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

CardList.propTypes = {
  cards: PropTypes.array,
  onCardClick: PropTypes.func,
  pageSize: PropTypes.number
};
