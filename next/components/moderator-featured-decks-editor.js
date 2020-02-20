import React from 'react';
import PropTypes from 'prop-types';

// <style jsx>{}</style>
function moderatorFeaturedDecksEditor() {
  const deckIds = [1, 2, 3];
  const onChangeDeckId = id => {
    console.log('hi', id);
  };
  return (
    <div>
      <h1>Edit Featured Decks</h1>
      {deckIds.map((id, index) => {
        return (
          <label key={id} htmlFor={`deckId${index}`}>
            deck Id:{id}
            <input
              name={`deckId${index}`}
              value={id}
              onChange={onChangeDeckId}
            />
          </label>
        );
      })}
    </div>
  );
}

moderatorFeaturedDecksEditor.defaultProps = {};

moderatorFeaturedDecksEditor.propTypes = {};

export default moderatorFeaturedDecksEditor;
