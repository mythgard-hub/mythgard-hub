import React, { useState } from 'react';
import AllCards from '../components/all-cards';
import SomeCards from '../components/some-cards';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import ImportDeck from '../components/import-deck';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import DeckExport from '../components/deck-export';
import { initializeDeckBuilder, addCardToDeck } from '../lib/deck-utils';
import FactionFilters from '../components/faction-filters';
import DeckCardList from '../components/deck-card-list';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';
import EditDeckName from '../components/edit-deck-name';

const saveDeck = (apolloClient, deckInProgress) => {
  let deckId;
  return createNewEmptyDeck(apolloClient, deckInProgress.deckName)
    .then(({ data }) => {
      deckId = data.createDeck.deck.id;
      return addCardsToDBDeck(
        apolloClient,
        deckId,
        Object.values(deckInProgress.mainDeck)
      );
    })
    .then(() => deckId);
};

function DeckBuilderPage() {
  const [mainDeckInput, setMainDeckInput] = useState('');
  const [cardFilters, setCardFilters] = useState(false);
  const [deckInProgress, setDeckInProgress] = useState(initializeDeckBuilder());

  const updateDeckName = e => {
    setDeckInProgress({
      ...deckInProgress,
      deckName: e.target.value
    });
  };

  const handleSubmit = (e, client) => {
    e && e.preventDefault();
    if (!validateState()) return;

    saveDeck(client, deckInProgress).then(deckId => {
      Router.push(`/deck?id=${deckId}`);
    });
  };

  const onCollectionClick = (e, card) => {
    e && e.preventDefault();

    const newMainDeck = addCardToDeck(deckInProgress.mainDeck, {
      quantity: 1,
      card
    });

    setDeckInProgress({
      ...deckInProgress,
      mainDeck: newMainDeck
    });
  };

  const updateImportedDeck = importedDeck => setDeckInProgress(importedDeck);

  const validateState = () => {
    return Boolean(deckInProgress.deckName);
  };

  const onFactionClick = newFactions => {
    updateCardFilters('factions', newFactions);
  };

  const updateCardFilters = (prop, value) => {
    setCardFilters({
      ...cardFilters,
      [prop]: value
    });
  };

  return (
    <Layout title="Mythgard Hub | Deck Builder" desc="Build Mythgard Decks">
      <style jsx>{`
        .deck-builder-panels {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .collection {
          flex-grow: 1;
        }
        .deck-builder-container {
          display: flex;
        }
      `}</style>
      <h1 data-cy="header">Deck Builder</h1>
      <div className="deck-builder-panels">
        <div>
          <FactionFilters onFactionClick={onFactionClick} />
          <div className="collection" data-cy="deckBuilderCollection">
            <h2>Collection</h2>
            {(cardFilters && (
              <SomeCards
                filters={cardFilters}
                onCardClick={onCollectionClick}
              />
            )) || <AllCards onCardClick={onCollectionClick} />}
          </div>
          <ImportedDeckErrors importedDeck={deckInProgress} />
        </div>
        <div>
          <ImportDeck
            mainDeckInput={mainDeckInput}
            currentMainDeck={deckInProgress.mainDeck}
            handleInputChange={e => {
              setMainDeckInput(e.target.value);
            }}
            updateImportedDeck={updateImportedDeck}
          />
          <DeckExport deckInProgress={deckInProgress} />
          <ApolloConsumer>
            {client => (
              <>
                <input
                  type="submit"
                  value="Save Deck"
                  data-cy="saveDeck"
                  onClick={e => {
                    handleSubmit(e, client);
                  }}
                />
              </>
            )}
          </ApolloConsumer>
          <br />
          <button onClick={() => setDeckInProgress(initializeDeckBuilder())}>
            Clear All
          </button>
          <div className="deck-in-progress" data-cy="deckInProgress">
            <EditDeckName
              deckName={deckInProgress.deckName}
              onChange={updateDeckName}
            />
            <DeckCardList deckCards={Object.values(deckInProgress.mainDeck)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DeckBuilderPage;
