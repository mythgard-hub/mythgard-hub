import { useState } from 'react';
import PropTypes from 'prop-types';
import CardListItem from './card-list-item';
import PagingControls from './paging-controls.js';
import { onCurrentPage } from '../lib/paging.js';

export default function CardList({ onCardClick, cards, pageSize }) {
  const [currentPage, setPage] = useState(0);

  return (
    <>
      <ul className="cardList" data-cy="cardList">
        {cards.map((card, index) => {
          if (!onCurrentPage(index, currentPage, pageSize)) {
            return;
          }
          return (
            <li key={card.id ? card.id : index}>
              <CardListItem card={card} onClick={onCardClick} />
            </li>
          );
        })}
      </ul>
      <PagingControls
        currentPage={currentPage}
        setPage={setPage}
        itemCount={cards.length}
      ></PagingControls>
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
