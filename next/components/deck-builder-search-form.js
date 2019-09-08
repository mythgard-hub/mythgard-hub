import React from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import SearchFormText from './search-form-text.js';

function DeckBuilderSearchForm({ text, setText }) {
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
          margin: 52px 35px 20px 20px;
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
      <button>Clear Filters</button>
    </div>
  );
}

DeckBuilderSearchForm.propTypes = {
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default DeckBuilderSearchForm;
