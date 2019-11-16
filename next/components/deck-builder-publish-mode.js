import PropTypes from 'prop-types';
import Router from 'next/router';
import { PAGE_MODES } from '../constants/deck-builder';
import { clearDeckInProgress } from '../lib/deck-utils';

export default function DeckBuilderPublishMode({
  pageMode,
  setPageMode,
  deckId,
  setDeckInProgress
}) {
  if (pageMode !== PAGE_MODES.PUBLISH) return null;

  return (
    <div className="publish-deck-container">
      <style jsx>{`
        .publish-deck-container {
          margin-top: 20px;
        }
        .publish-button {
          margin-bottom: 15px;
        }
      `}</style>
      <button
        className="publish-button"
        onClick={() => {
          Router.push(`/deck?id=${deckId}`);
          clearDeckInProgress(setDeckInProgress);
        }}
      >
        Publish Decklist
      </button>
      <button onClick={() => setPageMode(PAGE_MODES.TABLE)}>Cancel</button>
    </div>
  );
}

DeckBuilderPublishMode.propTypes = {
  deckId: PropTypes.string,
  pageMode: PropTypes.string,
  setPageMode: PropTypes.func,
  setDeckInProgress: PropTypes.func
};
