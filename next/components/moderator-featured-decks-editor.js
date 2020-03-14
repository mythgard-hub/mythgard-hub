import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import CompactDeckList from './compact-deck-list.js';
import { topDeckPreviewsQuery as decksQuery } from '../lib/deck-queries.js';

// <style jsx>{}</style>
function moderatorFeaturedDecksEditor() {
  const { loading, error, data } = useQuery(decksQuery);
  const onChangeDeckId = id => {
    console.log('hi', id);
  };

  if (error) {
    return 'error loading top decks';
  }

  if (loading) {
    return 'loading...';
  }

  const deckPreviews =
    (data && data.deckPreviews && data.deckPreviews.nodes) || [];
  const deckIds = deckPreviews.map(x => x.deck.id);

  return (
    <div>
      <h1>Edit Featured Decks</h1>

      {deckIds.map((id, index) => {
        return (
          <div key={index}>
            <label>
              deck Id: {id} <button style={{ width: 100 }}>Delete</button>
            </label>
          </div>
        );
      })}
      <label>
        new deck Id: <input />
        <button style={{ width: 100 }}>Save</button>
      </label>
    </div>
  );
}

moderatorFeaturedDecksEditor.defaultProps = {};

moderatorFeaturedDecksEditor.propTypes = {};

export default moderatorFeaturedDecksEditor;
