import React from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import SearchFormText from './search-form-text.js';

function DeckBuilderSearchForm({ text, setText }) {
  const onTextChange = handleInputChangeHooks(setText);

  return (
    <SearchFormText
      label="Card Search"
      value={text}
      name="text"
      cyName="cardSearchText"
      onChange={onTextChange}
      placeholder="Search..."
      maxLength="100"
    />
  );
}

DeckBuilderSearchForm.propTypes = {
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default DeckBuilderSearchForm;
