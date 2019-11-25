import PropTypes from 'prop-types';
import DeckExport from '../components/deck-export';
import SaveDeck from '../components/save-deck';
import { PAGE_MODES } from '../constants/deck-builder';

export default function DeckBuilderActionButtons(props) {
  const {
    cardCount,
    pageMode,
    setPageMode,
    deckId,
    deckInProgress,
    setDeckInProgress,
    onClear,
    setNewDeckId
  } = props;

  if (!cardCount || pageMode !== PAGE_MODES.TABLE) return null;

  return (
    <div className="action-buttons" data-cy="deckBuilderActions">
      <style jsx>{`
        .action-buttons {
          display: flex;
          justify-content: space-between;
        }
        :global(.save-deck-container),
        :global(.deck-export-container),
        .clear-button-container {
          width: 106px;
        }
      `}</style>
      <SaveDeck
        deckId={deckId}
        deckInProgress={deckInProgress}
        setDeckInProgress={setDeckInProgress}
        setPageMode={setPageMode}
        setNewDeckId={setNewDeckId}
      />
      <div className="clear-button-container">
        <button onClick={onClear}>Clear</button>
      </div>
      <DeckExport deckInProgress={deckInProgress} />
    </div>
  );
}

DeckBuilderActionButtons.propTypes = {
  deckId: PropTypes.number,
  deckInProgress: PropTypes.object,
  onClear: PropTypes.func,
  setDeckInProgress: PropTypes.func,
  importMode: PropTypes.bool,
  pageMode: PropTypes.string,
  setPageMode: PropTypes.func,
  cardCount: PropTypes.number,
  setNewDeckId: PropTypes.func
};
