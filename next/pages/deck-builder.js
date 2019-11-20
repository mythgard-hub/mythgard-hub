import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
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
import { useApolloClient } from '@apollo/react-hooks';
import { DECK_BUILDER_TABS } from '../constants/deck';

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

const clearSessionStorageMsg = `We found a deck with unsaved changes. Discard them? This action cannot be undone.

If you press cancel, the deck with unsaved changes will be loaded instead.`;

const userWantsToDiscardChanges = () => confirm(clearSessionStorageMsg);

// `useEffect` will not run on the server. As long as we're using
// local/session storage, we need to make sure the code that loads/unloads a
// previously worked on decks is not run during an SSR.
const loadExistingDeck = (
  deckId,
  deckInProgress,
  setDeckInProgress,
  setIsError,
  client,
  useSessionStorage
) => {
  // used when we already know we want to use the deck in session
  // storage regardless of URL (see algorithm below)
  if (useSessionStorage) {
    return loadDeckFromSessionStorage(setDeckInProgress);
  }

  const storedDeckIdOrNaN = parseInt(
    sessionStorage.getItem('deckInProgressId'),
    10
  );

  // Slightly finicky algorithm...
  //
  // We have a deck id in the URL
  //    L No deck in session storage, or user wants to discard it
  //        = Clear storage, load deck from server
  //    L else (user wants to keep storage version)
  //        L Session storage deck has same id as URL
  //            = Load deck from storage, leave url alone
  //        L Session storage deck has different id from URL
  //            = Update url and deck with session storage version
  // L else
  //    L no deck in session storage
  //        = clean slate
  //    L else
  //        L deck in storage has an id
  //            = Update url and deck with session storage version
  //        L deck in storage has no id
  //            = load deck from storage, leave url alone
  const urlHasId = deckId && deckId > 0;
  const noDeckInStorage = !hasValidDeckInStorage();
  const deckIdInUrlEqualsStorageDeckId = storedDeckIdOrNaN === deckId;
  const deckInStorageHasId = storedDeckIdOrNaN > 0;

  if (urlHasId) {
    if (noDeckInStorage || userWantsToDiscardChanges()) {
      // Load the deck from server
      resetDeckBuilderSavedState();
      loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
      return true;
    } else if (deckIdInUrlEqualsStorageDeckId) {
      // Load deck from storage, leave url alone
      return loadDeckFromSessionStorage(setDeckInProgress);
    } else {
      // Update url and deck with session storage version
      Router.replace(
        `/deck-builder?id=${storedDeckIdOrNaN}&useSessionStorage=1`
      );
      return false;
    }
  } else if (noDeckInStorage) {
    // clean slate
    resetDeckBuilderSavedState();
    return false;
  } else if (deckInStorageHasId) {
    // update url and deck with session storage version
    Router.replace(`/deck-builder?id=${storedDeckIdOrNaN}&useSessionStorage=1`);
    return false;
  } else {
    // load deck from storage, leave url alone
    return loadDeckFromSessionStorage(setDeckInProgress);
  }
};

function DeckBuilderPage({ deckId, useSessionStorage }) {
  const [cardSearchText, setCardSearchText] = useState(
    initFilters.cardSearchText
  );
  const [cardRarities, setCardRarities] = useState(initFilters.cardRarities);
  const [cardManaCosts, setCardManaCosts] = useState(initFilters.cardManaCosts);
  const [supertypes, setSupertypes] = useState(initFilters.supertypes);
  const [factions, setFactions] = useState(initFilters.factions);
  const [currentTab, setTab] = useState(DECK_BUILDER_TABS[0]);
  const [viewFilters, setViewFilters] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editingExisting, setEditingExisting] = useState(false);

  const [deckInProgress, setDeckInProgress] = useStateDeck(deckId);
  const client = useApolloClient();

  const onClear = () => {
    setEditingExisting(false);
    if (deckId) {
      Router.replace('/deck-builder');
    }
  };

  useEffect(() => {
    if (
      loadExistingDeck(
        deckId,
        deckInProgress,
        setDeckInProgress,
        setIsError,
        client,
        useSessionStorage
      )
    ) {
      setEditingExisting(true);
    }
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
          padding-right: 15px;
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
            <div>
              {editingExisting && (
                <h2 className="currentlyEditingMsg">
                  Currently Editing &quot;
                  {deckInProgress.deckName || 'untitled'}&quot;
                </h2>
              )}
              <DeckBuilderSearchForm
                text={cardSearchText}
                setTab={setTab}
                setText={setCardSearchText}
                onClearFilters={handleClearFilters}
              />
            </div>
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
            switchToCards={_ => setViewFilters(false)}
            setTab={setTab}
            deckId={deckId}
            deckInProgress={deckInProgress}
            setDeckInProgress={setDeckInProgress}
            onClear={onClear}
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
  let useSessionStorage = parseInt(query.useSessionStorage, 10);
  useSessionStorage = Number.isInteger(useSessionStorage)
    ? useSessionStorage
    : 0;
  return { deckId, useSessionStorage };
};

DeckBuilderPage.propTypes = {
  deckId: PropTypes.number,
  useSessionStorage: PropTypes.number
};

export default DeckBuilderPage;
