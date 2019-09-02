import { useState } from 'react';
import PropTypes from 'prop-types';
import CardListItem from './card-list-item';

export default function CardList({ onCardClick, cards, pageSize }) {
  const [currentPage, setPage] = useState(0);
  const min = currentPage * pageSize;
  const max = (currentPage + 1) * pageSize - 1;
  const totalPages = Math.ceil(cards.length / pageSize);

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
          .mg-paging .counter {
            font-size: 20px;
            padding: 5px 10px;
            margin: 0 10px;
          }
        `}</style>
        <button
          className="mgPrevious"
          disabled={!showPrev}
          onClick={() => setPage(currentPage - 1)}
        >
          Previous
        </button>
        <div className="counter">
          {currentPage + 1} / {totalPages}{' '}
        </div>
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

CardList.defaultProps = {
  pageSize: 20
};

CardList.propTypes = {
  cards: PropTypes.array,
  onCardClick: PropTypes.func,
  pageSize: PropTypes.number
};
