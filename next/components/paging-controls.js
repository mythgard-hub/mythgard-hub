import React from 'react';
import PropTypes from 'prop-types';
import { hasNextPage, hasPrevPage, rangeMin, rangeMax } from '../lib/paging.js';
import { scrollToTopOfList } from '../lib/navigation-utils.js';

function PagingControls({
  currentPage,
  pageSize,
  itemCount,
  setPage,
  listRef
}) {
  const showNext = hasNextPage(currentPage, pageSize, itemCount);
  const showPrev = hasPrevPage(currentPage);

  return (
    <div className="mg-paging">
      <style jsx>{`
        .mg-paging {
          display: flex;
          padding-bottom: 30px;
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

        @media only screen and (max-width: 600px) {
          .mg-paging {
            flex-direction: column;
            align-items: center;
          }

          .mg-paging .counter {
            padding: 15px 0;
            margin: 0;
          }
        }
      `}</style>
      <button
        className="mgPrevious"
        disabled={!showPrev}
        onClick={() => {
          scrollToTopOfList(listRef);
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
          scrollToTopOfList(listRef);
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
