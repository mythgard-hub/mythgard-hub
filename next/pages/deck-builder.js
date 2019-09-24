import React, { useState, useCallback, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Layout from '../components/layout';
import { initializeDeckBuilder } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';
import CardSearchFilters from '../components/card-search-filters';
import SliderSwitch from '../components/slider-switch';
import DeckBuilderCardDisplay from '../components/deck-builder-card-display';
import { singleDeckQuery, deckCardsQuery } from '../lib/deck-queries';
import ErrorMessage from '../components/error-message';

const initialSearchFilters = {
  cardSearchText: '',
  cardRarities: [],
  cardManaCosts: [],
  supertypes: [],
  factions: []
};

const getInitialProps = async ({ query }) => {
  const { id } = query;
  // `null` instead of `undefined` to match sessionStorage.getItem('cantfind')
  return { deckId: id || null };
};

const loadDeckFromSessionStorage = setDeckInProgress => {
  try {
    const d = JSON.parse(sessionStorage.getItem('deckInProgress'));
    if (!d) return;
    const deckProperties = Object.keys(initializeDeckBuilder());
    const isValidDeck = deckProperties.reduce((isValid, key) => {
      return isValid && d.hasOwnProperty(key);
    });
    if (isValidDeck) {
      setDeckInProgress(d);
    }
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
};

const loadDeckFromServer = (
  apolloClient,
  deckId,
  setDeckInProgress,
  setIsError
) => {
  // noop if we don't have a legit deck id
  const id = parseInt(deckId, 10);
  if (!Number.isInteger(id)) return;

  const deckPromise = apolloClient.query({
    query: singleDeckQuery,
    variables: {
      id
    }
  });

  const cardsPromise = apolloClient.query({
    query: deckCardsQuery,
    variables: {
      id
    }
  });

  Promise.all([deckPromise, cardsPromise])
    .then(args => {
      const deck = args[0].data.deck;
      // I wonder if Lily can feel such a great disturbance in the force while
      // she's on vacation :thinkingface:
      const cards = args[1].data.deck.cardDecks.nodes;
      setDeckInProgress({
        deckName: deck.name,
        deckPath: deck.path,
        deckPower: deck.power,
        mainDeck: cards.reduce((acc, c) => {
          acc[c.card.id] = c;
          return acc;
        }, {})
      });
    })
    .catch(reason => {
      console.error(reason);
      setIsError(true);
    });
};

function DeckBuilderPage({ deckId }) {
  const [cardSearchText, setCardSearchText] = useState(
    initialSearchFilters.cardSearchText
  );
  const [cardRarities, setCardRarities] = useState(
    initialSearchFilters.cardRarities
  );
  const [cardManaCosts, setCardManaCosts] = useState(
    initialSearchFilters.cardManaCosts
  );
  const [supertypes, setSupertypes] = useState(initialSearchFilters.supertypes);
  const [factions, setFactions] = useState(initialSearchFilters.factions);
  const [currentTab, setTab] = useState('');
  const [viewFilters, setViewFilters] = useState(false);
  const [deckInProgress, _setDeckInProgress] = useState(
    initializeDeckBuilder()
  );

  const [isError, setIsError] = useState(false);

  // Sync our edits locally as they're made. This let's us re-populate a deck
  // after a page refresh or a sequence of redirects.
  const setDeckInProgress = d => {
    _setDeckInProgress(d);
    sessionStorage.setItem('deckInProgressId', JSON.stringify(deckId));
    sessionStorage.setItem('deckInProgress', JSON.stringify(d));
  };

  const client = useApolloClient();

  // `useEffect` will not run on the server. As long as we're using
  // local/session storage, we need to make sure the code that loads/unloads a
  // previously worked on decks is not run during an SSR.
  useEffect(() => {
    const storedDeckId = sessionStorage.getItem('deckInProgressId');
    if ('' + storedDeckId === '' + deckId) {
      if (!loadDeckFromSessionStorage(setDeckInProgress)) {
        loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
      }
    } else {
      if (Number.isInteger(parseInt(deckId, 10))) {
        loadDeckFromServer(client, deckId, setDeckInProgress, setIsError);
      } else {
        // Needed in case you hit the deck builder tab while editing an existing
        // deck.
        setDeckInProgress(initializeDeckBuilder());
      }
    }
  }, [deckId]);

  const handleClearFilters = useCallback(() => {
    setCardSearchText(initialSearchFilters.cardSearchText);
    setCardRarities(initialSearchFilters.cardRarities);
    setCardManaCosts(initialSearchFilters.cardManaCosts);
    setSupertypes(initialSearchFilters.supertypes);
    setFactions(initialSearchFilters.factions);
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

DeckBuilderPage.getInitialProps = getInitialProps;

export default DeckBuilderPage;
