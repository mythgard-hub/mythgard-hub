import { useState } from 'react';
import PropTypes from 'prop-types';
import CardListItem from './card-list-item';
import PagingControls from './paging-controls.js';
import { onCurrentPage } from '../lib/paging.js';

export default function CardList({ onCardClick, cards, pageSize, options }) {
  const [currentPage, setPage] = useState(0);
  const { withPaging } = options;

  return (
    <>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }
        ul li {
          margin-right: 17px;
          margin-bottom: 17px;
        }

        @media only screen and (max-width: 600px) {
          ul {
            padding: 0;
          }
        }
      `}</style>
      <ul className="cardList" data-cy="cardList">
        {cards.map((card, index) => {
          if (withPaging && !onCurrentPage(index, currentPage, pageSize)) {
            return;
          }
          return (
            <li key={card.id ? card.id : index}>
              <CardListItem
                card={card}
                onClick={onCardClick}
                options={options}
              />
            </li>
          );
        })}
      </ul>
      {withPaging && (
        <PagingControls
          currentPage={currentPage}
          setPage={setPage}
          itemCount={cards.length}
        ></PagingControls>
      )}
    </>
  );
}

CardList.defaultProps = {
  pageSize: 12,
  options: {
    withPaging: true,
    isLandscape: false
  }
};

CardList.propTypes = {
  cards: PropTypes.array,
  onCardClick: PropTypes.func,
  pageSize: PropTypes.number,
  options: PropTypes.shape({
    isLandscape: PropTypes.bool,
    withPaging: PropTypes.bool
  })
};
