import React from 'react';
import PropTypes from 'prop-types';

// <style jsx>{}</style>
function moderatorFeaturedDecksEditor() {
  const deckIds = [1, 2, 3];
  return (
    <div>
      <h1>Edit Featured Decks</h1>
      {deckIds.map(id => {
        return <span key={id}>{id}</span>;
      })}
    </div>
  );
}

moderatorFeaturedDecksEditor.defaultProps = {};

moderatorFeaturedDecksEditor.propTypes = {};

export default moderatorFeaturedDecksEditor;
