import React from 'react';
import PropTypes from 'prop-types';

export default function EditDeckName(props) {
  const { deckName, onChange } = props;

  return (
    <div>
      <label>
        Deck Name:{' '}
        <input
          data-cy="deckTitle"
          type="text"
          name="deckName"
          onChange={onChange}
          value={deckName}
        />
      </label>
    </div>
  );
}

EditDeckName.defaultProps = {
  deckName: '[new deck]'
};

EditDeckName.propTypes = {
  deckName: PropTypes.string,
  onChange: PropTypes.func
};
