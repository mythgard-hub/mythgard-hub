import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImportDeck from '../components/import-deck';
import DeckExport from '../components/deck-export';
import DeckCardTable from '../components/deck-card-table';
import EditDeckName from '../components/edit-deck-name';
import SaveDeck from '../components/save-deck';
import { initializeDeckBuilder } from '../lib/deck-utils';

export default function DeckBuilderSidebar(props) {
  const { deckInProgress, setDeckInProgress } = props;
  const [mainDeckInput, setMainDeckInput] = useState('');

  const updateDeckName = e => {
    setDeckInProgress({
      ...deckInProgress,
      deckName: e.target.value
    });
  };

  const deleteCardFromTable = id => {
    const newMainDeck = { ...deckInProgress.mainDeck };
    delete newMainDeck[id];

    setDeckInProgress({
      ...deckInProgress,
      mainDeck: newMainDeck
    });
  };

  const updateImportedDeck = importedDeck => setDeckInProgress(importedDeck);

  return (
    <div className="deck-builder-actions">
      <style jsx>{`
        .deck-builder-actions {
          width: 35%;
        }
        .deck-builder-actions button {
          margin-bottom: 10px;
        }
      `}</style>
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
        Clear Deck
      </button>
      <div className="deck-in-progress" data-cy="deckInProgress">
        <EditDeckName
          deckName={deckInProgress.deckName}
          onChange={updateDeckName}
        />
        <DeckCardTable deck={deckInProgress} deleteCard={deleteCardFromTable} />
      </div>
    </div>
  );
}

DeckBuilderSidebar.propTypes = {
  deckInProgress: PropTypes.object,
  setDeckInProgress: PropTypes.func
};
