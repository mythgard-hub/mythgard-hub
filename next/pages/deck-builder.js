import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../components/layout';
import {
  initializeDeckBuilder,
  storeDeckInSessionStorage,
  loadDeckFromSessionStorage,
  loadDeckFromServer,
  hasValidDeckInStorage,
  resetDeckBuilderSavedState
} from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';
import CardSearchFilters from '../components/card-search-filters';
import SliderSwitch from '../components/slider-switch';
import DeckBuilderCardDisplay from '../components/deck-builder-card-display';
import ErrorMessage from '../components/error-message';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';

const initFilters = {
  cardSearchText: '',
  cardRarities: [],
  cardManaCosts: [],
  supertypes: [],
  factions: []
};

const useStateDeck = deckId => {
  const [deckInProgress, _setDeckInProgress] = useState(
    initializeDeckBuilder()
  );

  // Sync our edits locally as they're made. This let's us re-populate a deck
  // after a page refresh or a sequence of redirects.
  const setDeckInProgress = d => {
    _setDeckInProgress(d);
    storeDeckInSessionStorage(deckId, d);
  };
  return [deckInProgress, setDeckInProgress];
};

// `useEffect` will not run on the server. As long as we're using
// local/session storage, we need to make sure the code that loads/unloads a
// previously worked on decks is not run during an SSR.
const loadExistingDeck = (
  deckId,
  deckInProgress,
  setDeckInProgress,
  setIsError,
  client
) => {
  const msg = `We found a deck with unsaved changes. Discard them? This action cannot be undone.

If you press cancel, the deck with unsaved changes will be loaded instead.`;
  const storedDeckId = sessionStorage.getItem('deckInProgressId');

  // loading existing deck but deck in storage
  if (deckId && storedDeckId && hasValidDeckInStorage()) {
    if (confirm(msg)) {
      resetDeckBuilderSavedState();
    }
  }

  if (deckId) {
    loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
  } else {
    loadDeckFromSessionStorage(setDeckInProgress);
  }
};

function DeckBuilderPage({ deckId }) {
  const [cardSearchText, setCardSearchText] = useState(
    initFilters.cardSearchText
  );
  const [cardRarities, setCardRarities] = useState(initFilters.cardRarities);
  const [cardManaCosts, setCardManaCosts] = useState(initFilters.cardManaCosts);
  const [supertypes, setSupertypes] = useState(initFilters.supertypes);
  const [factions, setFactions] = useState(initFilters.factions);
  const [currentTab, setTab] = useState('');
  const [viewFilters, setViewFilters] = useState(false);
  const [isError, setIsError] = useState(false);

  const [deckInProgress, setDeckInProgress] = useStateDeck(deckId);
  const client = useApolloClient();

  useEffect(() => {
    loadExistingDeck(
      deckId,
      deckInProgress,
      setDeckInProgress,
      setIsError,
      client
    );
  }, [deckId]);

  const handleClearFilters = useCallback(() => {
    setCardSearchText(initFilters.cardSearchText);
    setCardRarities(initFilters.cardRarities);
    setCardManaCosts(initFilters.cardManaCosts);
    setSupertypes(initFilters.supertypes);
    setFactions(initFilters.factions);
  });

  return (
    <Layout title="Mythgard Hub | Deck Builder" desc="Build Mythgard Decks">
      <style jsx>{`
        .deck-builder-card-selection {
          width: 100%;
          padding-right: 25px;
        }
        .deck-builder-panels {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .collection {
          flex-grow: 1;
        }

        @media only screen and (max-width: 600px) {
          .deck-builder-panels {
            flex-direction: column-reverse;
          }

          .deck-builder-card-selection {
            padding-right: 0;
          }
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECK_BUILDER}>Deck Builder</PageBanner>

      {isError && (
        <div style={{ marginTop: '20px' }}>
          <ErrorMessage message="We weren't able to load this deck for edits." />
        </div>
      )}

      {!isError && (
        <div className="deck-builder-panels">
          <div className="deck-builder-card-selection">
            <DeckBuilderSearchForm
              text={cardSearchText}
              setTab={setTab}
              setText={setCardSearchText}
              onClearFilters={handleClearFilters}
            />
            <FactionFilters factions={factions} onFactionClick={setFactions} />
            <SliderSwitch
              leftSlider="View Cards"
              rightSlider="View Filters"
              checked={viewFilters}
              onChange={() => {
                setViewFilters(prev => !prev);
              }}
              onClickLabel={setViewFilters}
            />
            {viewFilters ? (
              <CardSearchFilters
                rarities={cardRarities}
                types={supertypes}
                manaCosts={cardManaCosts}
                setCardManaCosts={setCardManaCosts}
                setSupertypes={setSupertypes}
                setCardRarities={setCardRarities}
              />
            ) : (
              <DeckBuilderCardDisplay
                currentTab={currentTab}
                setTab={setTab}
                deckInProgress={deckInProgress}
                setDeckInProgress={setDeckInProgress}
                cardSearchText={cardSearchText}
                cardRarities={cardRarities}
                cardManaCosts={cardManaCosts}
                supertypes={supertypes}
                factions={factions}
              />
            )}
          </div>
          <DeckBuilderSidebar
            deckId={deckId}
            deckInProgress={deckInProgress}
            setDeckInProgress={setDeckInProgress}
          />
        </div>
      )}
    </Layout>
  );
}

DeckBuilderPage.getInitialProps = async ({ query }) => {
  // `null` instead of `undefined` to match sessionStorage.getItem('cantfind')
  let deckId = parseInt(query.id, 10);
  deckId = Number.isInteger(deckId) ? deckId : null;
  return { deckId };
};

DeckBuilderPage.propTypes = {
  deckId: PropTypes.number
};

export default DeckBuilderPage;
