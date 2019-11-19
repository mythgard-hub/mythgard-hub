import PropTypes from 'prop-types';
import Router from 'next/router';
import { PAGE_MODES } from '../constants/deck-builder';
import { clearDeckInProgress } from '../lib/deck-utils';
import { ARCHETYPES, TYPES } from '../constants/deck';
import DeckBuilderPublishDropdown from './deck-builder-publish-dropdown';

export default function DeckBuilderPublishMode({
  pageMode,
  setPageMode,
  deckId,
  setDeckInProgress,
  deckInProgress
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
      <DeckBuilderPublishDropdown
        title="Deck Archetype"
        value={deckInProgress.archetype || ARCHETYPES[0]}
        options={ARCHETYPES}
        onChange={e => {
          setDeckInProgress({
            ...deckInProgress,
            archetype: e.target.value
          });
        }}
      />
      <DeckBuilderPublishDropdown
        title="Deck Type"
        value={deckInProgress.type || TYPES[0]}
        options={TYPES}
        onChange={e => {
          setDeckInProgress({
            ...deckInProgress,
            type: e.target.value
          });
        }}
      />
    </div>
  );
}

DeckBuilderPublishMode.propTypes = {
  deckId: PropTypes.string,
  pageMode: PropTypes.string,
  setPageMode: PropTypes.func,
  setDeckInProgress: PropTypes.func,
  deckInProgress: PropTypes.shape({
    archetype: PropTypes.string,
    type: PropTypes.string
  })
};
