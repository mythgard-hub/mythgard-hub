import React from 'react';
import PropTypes from 'prop-types';
import SearchFormText from './search-form-text.js';

export default function EditDeckName(props) {
  const { deckName, onChange } = props;

  return (
    <SearchFormText
      label="Deck Name"
      value={deckName}
      name="text"
      cyName="deckTitle"
      onChange={onChange}
      placeholder="Enter a name..."
    />
  );
}

EditDeckName.defaultProps = {
  deckName: '[new deck]'
};

EditDeckName.propTypes = {
  deckName: PropTypes.string,
  onChange: PropTypes.func
};
