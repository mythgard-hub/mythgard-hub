import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ImportDeck from '../components/import-deck';
import DeckCardTable from '../components/deck-card-table';
import {
  initializeDeckBuilder,
  resetDeckBuilderSavedState,
  getCardCount
} from '../lib/deck-utils';
import { ThemeContext } from './theme-context';
import DeckBuilderActionButtons from './deck-builder-action-buttons';
import { PAGE_MODES } from '../constants/deck-builder';
import DeckBuilderPublishMode from './deck-builder-publish-mode';

export default function DeckBuilderSidebar(props) {
  const {
    deckId,
    deckInProgress,
    setDeckInProgress,
    switchToCards,
    setTab
  } = props;
  const theme = useContext(ThemeContext);
  const [mainDeckInput, setMainDeckInput] = useState('');
  const [pageMode, setPageMode] = useState(PAGE_MODES.TABLE);
  const [newDeckId, setNewDeckId] = useState(null);

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
  const cardCount = getCardCount(deckInProgress);
  const clearDeck = onClear => {
    const confirmation = confirm(
      'Are you sure you want to clear the deck? This action cannot be undone.'
    );

    if (confirmation) {
      setDeckInProgress(initializeDeckBuilder());
      resetDeckBuilderSavedState();
      onClear();
    }
  };

  return (
    <div className="deck-builder-actions">
      <style jsx>{`
        .deck-builder-actions {
          width: 60%;
        }
        .deck-builder-actions button {
          margin-bottom: 10px;
        }
        .card-count {
          text-align: end;
          text-transform: uppercase;
        }
        .card-count span {
          font-size: 20px;
          font-weight: bold;
        }
        .build-deck-title {
          text-align: center;
          margin-bottom: 15px;
          font-size: 18px;
        }
        .action-button-border {
          margin-top: 18px;
          margin-bottom: 10px;
          margin-left: auto;
          margin-right: auto;
          width: 90%;
          border: 0;
          height: 1px;
          background-image: linear-gradient(
            to right,
            ${theme.orangeSeparatorSecondaryColor},
            ${theme.orangeSeparatorColor},
            ${theme.orangeSeparatorSecondaryColor}
          );
        }

        @media only screen and (max-width: 600px) {
          .deck-builder-actions {
            width: 100%;
          }
        }
      `}</style>
      <ImportDeck
        mainDeckInput={mainDeckInput}
        handleInputChange={e => {
          setMainDeckInput(e.target.value);
        }}
        updateImportedDeck={updateImportedDeck}
        pageMode={pageMode}
        setPageMode={setPageMode}
      />
      <DeckBuilderPublishMode
        pageMode={pageMode}
        setPageMode={setPageMode}
        deckId={newDeckId || deckId}
        setDeckInProgress={setDeckInProgress}
        deckInProgress={deckInProgress}
      />
      <hr className="action-button-border" />
      <DeckBuilderActionButtons
        cardCount={cardCount}
        pageMode={pageMode}
        setPageMode={setPageMode}
        deckId={deckId}
        deckInProgress={deckInProgress}
        setDeckInProgress={setDeckInProgress}
        onClear={() => clearDeck(props.onClear)}
        setNewDeckId={setNewDeckId}
      />
      {pageMode === PAGE_MODES.TABLE && !cardCount && (
        <div className="build-deck-title">
          - OR - Select a card to begin building
        </div>
      )}
      {pageMode !== PAGE_MODES.IMPORT && (
        <div className="deck-in-progress" data-cy="deckInProgress">
          <div className="card-count">
            Cards: <span>{cardCount}</span>
          </div>
          <DeckCardTable
            updateDeckName={updateDeckName}
            deck={deckInProgress}
            deleteCard={deleteCardFromTable}
            switchToCards={switchToCards}
            setTab={setTab}
          />
        </div>
      )}
    </div>
  );
}

DeckBuilderSidebar.propTypes = {
  deckId: PropTypes.number,
  deckInProgress: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckPower: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  }),
  onClear: PropTypes.func,
  setDeckInProgress: PropTypes.func,
  switchToCards: PropTypes.func,
  setTab: PropTypes.func
};
