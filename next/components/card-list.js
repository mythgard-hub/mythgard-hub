import React, { useContext } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CardListItem from './card-list-item';
import PagingControls from './paging-controls.js';
import { onCurrentPage } from '../lib/paging.js';
import { ThemeContext } from '../components/theme-context.js';

export default function CardList({ onCardClick, cards, pageSize, options }) {
  const [currentPage, setPage] = useState(0);
  const { withPaging } = options;
  const cardListRef = React.createRef();
  const theme = useContext(ThemeContext);

  return (
    <div ref={cardListRef}>
      <style jsx>{`
        .cardList {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          margin: ${theme.spacing / 2}px -${theme.cardSpacing / 2}px 0 -${theme.cardSpacing /
              2}px;
        }
        .cardListItem {
          flex: 1 0 33.33%;
          padding: 0 ${theme.cardSpacing / 2}px ${theme.cardSpacing}px
            ${theme.cardSpacing / 2}px;
          text-align: center;
        }

        @media only screen and (max-width: 575.98px) {
          .cardListItem {
            flex: 1 0 50%;
            padding-bottom: ${theme.cardSpacing / 2}px;
          }
        }
      `}</style>
      <ul className="cardList" data-cy="cardList">
        {cards.map((card, index) => {
          if (withPaging && !onCurrentPage(index, currentPage, pageSize)) {
            return;
          }
          return (
            <li key={card.id ? card.id : index} className="cardListItem">
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
          listRef={cardListRef}
        ></PagingControls>
      )}
    </div>
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
