import PropTypes from 'prop-types';
import DeckExport from '../components/deck-export';
import SaveDeck from '../components/save-deck';

export default function DeckBuilderActionButtons(props) {
  const {
    cardCount,
    importMode,
    deckId,
    deckInProgress,
    setDeckInProgress,
    onClear
  } = props;

  if (!cardCount || importMode) return null;

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
  cardCount: PropTypes.number
};
