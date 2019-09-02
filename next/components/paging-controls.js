import React from 'react';
import PropTypes from 'prop-types';
import { hasNextPage, hasPrevPage, totalPages } from '../lib/paging.js';

function PagingControls({ currentPage, pageSize, itemCount, setPage }) {
  const showNext = hasNextPage(currentPage, pageSize, itemCount);
  const showPrev = hasPrevPage(currentPage);

  return (
    <div className="mg-paging">
      <style jsx>{`
        .mg-paging {
          display: flex;
        }
        .mg-paging button {
          max-width: 120px;
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
        {currentPage + 1} / {totalPages(itemCount, pageSize)}
      </div>
      <button
        disabled={!showNext}
        className="mgNext"
        onClick={() => setPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

PagingControls.defaultProps = {
  pageSize: 20
};

PagingControls.propTypes = {
  currentPage: PropTypes.any.isRequired,
  pageSize: PropTypes.any.isRequired,
  itemCount: PropTypes.any.isRequired,
  setPage: PropTypes.func.isRequired
};

export default PagingControls;
