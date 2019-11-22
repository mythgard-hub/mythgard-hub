import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { hasNextPage, hasPrevPage, rangeMin, rangeMax } from '../lib/paging.js';
import { scrollToTopOfElement } from '../lib/ui-utils';
import { ThemeContext } from '../components/theme-context.js';

function PagingControls({
  currentPage,
  pageSize,
  itemCount,
  setPage,
  listRef
}) {
  const showNext = hasNextPage(currentPage, pageSize, itemCount);
  const showPrev = hasPrevPage(currentPage);
  const theme = useContext(ThemeContext);

  return (
    <div className="mg-paging">
      <style jsx>{`
        .mg-paging {
          display: flex;
          padding: ${theme.cardSpacing / 2}px 0 ${theme.cardSpacing}px 0;
          justify-content: center;
        }
        .mg-paging button {
          max-width: 120px;
          height: 40px;
          padding: 0;
        }
        .mg-paging .counter {
          font-size: 20px;
          padding: 5px 10px;
          margin: 0 10px;
          white-space: nowrap;
        }

        @media only screen and (max-width: 575.98px) {
          .mg-paging {
            flex-direction: row;
            align-items: center;
          }

          .mg-paging .counter {
            font-size: 15px;
            margin: 0;
          }
        }
      `}</style>
      <button
        className="mgPrevious"
        disabled={!showPrev}
        onClick={() => {
          scrollToTopOfElement(listRef);
          setPage(currentPage - 1);
        }}
      >
        Previous
      </button>
      <div className="counter">
        Showing {rangeMin(currentPage, pageSize)} -{' '}
        {Math.min(itemCount, rangeMax(currentPage, pageSize))} of{' '}
        <span className="mgPagingTotal" data-cy="pagingControlsTotal">
          {itemCount}
        </span>{' '}
      </div>
      <button
        disabled={!showNext}
        className="mgNext"
        onClick={() => {
          scrollToTopOfElement(listRef);
          setPage(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

PagingControls.defaultProps = {
  pageSize: 12
};

PagingControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  listRef: PropTypes.string
};

export default PagingControls;
