import React from 'react';
import ErrorMessage from './error-message.js';
import DeckPreview from './deck-preview.js';
import PropTypes from 'prop-types';
import { deckPreviewsToDecks } from '../lib/deck-queries.js';
import { ThemeContext } from '../components/theme-context.js';
import { useContext } from 'react';

function CompactDeckList(props) {
  const theme = useContext(ThemeContext);
  const { loading, error, data, cyData } = props;
  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  let decks = (data && data.deckPreviews && data.deckPreviews.nodes) || [];
  decks = deckPreviewsToDecks(decks);

  return (
    <ul data-cy={cyData} className="deckList">
      <style jsx>{`
        .deckList {
          list-style: none;
          padding: 0;
        }

        :global(.deckPreview) {
          background-color: ${theme.panelBackground};
        }

        @media only screen and (max-width: 600px) {
          .deckList {
            padding: 0 10px;
          }
        }
      `}</style>
      {decks.map((deck, i) => {
        return (
          <li key={i}>
            <DeckPreview deck={deck} />
          </li>
        );
      })}
    </ul>
  );
}

CompactDeckList.propTypes = {
  data: PropTypes.shape({
    deckPreviews: PropTypes.shape({
      nodes: PropTypes.array
    })
  }),
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  cyData: PropTypes.string
};

export default CompactDeckList;
