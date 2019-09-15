import React from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import SearchFormText from './search-form-text.js';

function DeckBuilderSearchForm({ text, setText, onClearFilters }) {
  const onTextChange = handleInputChangeHooks(setText);

  return (
    <div className="card-search-section">
      <style jsx>{`
        .card-search-section {
          display: flex;
          justify-content: space-between;
        }
        .card-search-section button {
          width: 130px;
          height: 40px;
          margin: 52px 17px 20px 20px;
        }
        :global(.input-label) {
          width: 75%;
          margin: 30px 0 10px 0;
        }

        @media only screen and (max-width: 600px) {
          .card-search-section {
            flex-direction: column;
            padding: 0;
          }
          .card-search-section button {
            width: 185px;
            margin: 0px 0px 10px 0px;
          }
          :global(.input-label) {
            width: 100%;
            margin: 20px 0;
            padding-right: 0;
          }
        }
      `}</style>
      <SearchFormText
        label="Card Search"
        value={text}
        name="text"
        cyName="cardSearchText"
        onChange={onTextChange}
        placeholder="Search..."
        maxLength="100"
      />
      <button data-cy="searchForm_clearButton" onClick={() => onClearFilters()}>
        Clear Filters
      </button>
    </div>
  );
}

DeckBuilderSearchForm.propTypes = {
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default DeckBuilderSearchForm;
