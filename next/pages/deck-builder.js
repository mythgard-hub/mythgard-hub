import React, { useState } from 'react';
import SomeCards from '../components/some-cards';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import ImportDeck from '../components/import-deck';
import DeckExport from '../components/deck-export';
import { initializeDeckBuilder, addCardToDeck } from '../lib/deck-utils';
import FactionFilters from '../components/faction-filters';
import DeckCardTable from '../components/deck-card-table';
import EditDeckName from '../components/edit-deck-name';
import SaveDeck from '../components/save-deck';
import PageBanner from '../components/page-banner';

function DeckBuilderPage() {
  const [mainDeckInput, setMainDeckInput] = useState('');
  const [cardFilters, setCardFilters] = useState(null);
  const [deckInProgress, setDeckInProgress] = useState(initializeDeckBuilder());

  const updateDeckName = e => {
    setDeckInProgress({
      ...deckInProgress,
      deckName: e.target.value
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
        .deck-builder-actions {
          width: 35%;
        }
        .deck-builder-actions button {
          margin-bottom: 10px;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECK_BUILDER}>Deck Builder</PageBanner>
      <div className="deck-builder-panels">
        <div className="deck-builder-card-selection">
          <FactionFilters onFactionClick={onFactionClick} />
          <SomeCards filters={cardFilters} onCardClick={onCollectionClick} />
          <ImportedDeckErrors importedDeck={deckInProgress} />
        </div>
        <div className="deck-builder-actions">
          <ImportDeck
            mainDeckInput={mainDeckInput}
            currentMainDeck={deckInProgress.mainDeck}
            handleInputChange={e => {
              setMainDeckInput(e.target.value);
            }}
            updateImportedDeck={updateImportedDeck}
          />
          <DeckExport deckInProgress={deckInProgress} />
          <SaveDeck deckInProgress={deckInProgress} />
          <button onClick={() => setDeckInProgress(initializeDeckBuilder())}>
            Clear
          </button>
          <div className="deck-in-progress" data-cy="deckInProgress">
            <EditDeckName
              deckName={deckInProgress.deckName}
              onChange={updateDeckName}
            />
            <DeckCardTable deck={deckInProgress} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DeckBuilderPage;
