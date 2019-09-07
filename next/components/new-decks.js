import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message.js';
import DeckPreview from './deck-preview.js';
import {
  deckPreviewQuery as decksQuery,
  deckPreviewsToDecks
} from '../lib/deck-queries.js';

function NewDecks() {
  const { loading, error, data } = useQuery(decksQuery);
  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading...</div>;

  let decks = (data && data.deckPreviews && data.deckPreviews.nodes) || [];
  decks = deckPreviewsToDecks(decks);

  return (
    <>
      <style jsx>{`
        .deckList {
          list-style: none;
        }
      `}</style>
      <ul className="deckList">
        {decks.map((deck, i) => {
          return (
            <li key={i}>
              <DeckPreview deck={deck} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewDecks;
