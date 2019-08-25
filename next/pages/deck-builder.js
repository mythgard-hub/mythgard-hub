import React, { useState } from 'react';
import SomeCards from '../components/some-cards';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import ImportDeck from '../components/import-deck';
import DeckExport from '../components/deck-export';
import { initializeDeckBuilder, addCardToDeck } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form.js';
import DeckCardTable from '../components/deck-card-table';
import EditDeckName from '../components/edit-deck-name';
import SaveDeck from '../components/save-deck';

function DeckBuilderPage() {
  const [mainDeckInput, setMainDeckInput] = useState('');
  const [cardSearchText, setCardSearchText] = useState('');
  const [cardRarity, setCardRarity] = useState('');
  const [factions, setFactions] = useState([]);
  const cardFilters = {
    text: cardSearchText,
    factions
  };
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
      <h1 data-cy="header">Deck Builder</h1>
      <div className="deck-builder-panels">
        <div className="deck-builder-card-selection">
          <DeckBuilderSearchForm
            text={cardSearchText}
            setText={setCardSearchText}
            setRarity={setCardRarity}
            onFactionClick={setFactions}
          />
          <div className="collection" data-cy="deckBuilderCollection">
            <SomeCards filters={cardFilters} onCardClick={onCollectionClick} />
          </div>
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
