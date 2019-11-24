import { useContext } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import { saveDeckWithCards } from '../lib/deck-utils.js';
import { PAGE_MODES } from '../constants/deck-builder';
import { clearDeckInProgress } from '../lib/deck-utils';
import { ARCHETYPES, TYPES } from '../constants/deck';
import DeckBuilderPublishDropdown from './deck-builder-publish-dropdown';
import UserContext from '../components/user-context';

export default function DeckBuilderPublishMode({
  pageMode,
  setPageMode,
  deckId,
  setDeckInProgress,
  deckInProgress
}) {
  const { user } = useContext(UserContext);

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
      <ApolloConsumer>
        {client => (
          <button
            className="publish-button"
            onClick={() => {
              saveDeckWithCards(client, deckId, deckInProgress, user.id).then(
                () => {
                  Router.push(`/deck?id=${deckId}`);
                  clearDeckInProgress(setDeckInProgress);
                }
              );
            }}
          >
            Publish Decklist
          </button>
        )}
      </ApolloConsumer>
      <button onClick={() => setPageMode(PAGE_MODES.TABLE)}>Cancel</button>
      <DeckBuilderPublishDropdown
        title="Deck Archetype"
        value={deckInProgress.archetype || ARCHETYPES[0].label}
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
        value={deckInProgress.type || TYPES[0].label}
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
  deckId: PropTypes.number,
  pageMode: PropTypes.string,
  setPageMode: PropTypes.func,
  setDeckInProgress: PropTypes.func,
  deckInProgress: PropTypes.shape({
    archetype: PropTypes.string,
    type: PropTypes.string
  })
};
