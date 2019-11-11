import PropTypes from 'prop-types';

export default function DeckCardsTableEditMeta(props) {
  const { metaName, metaValue, onEditClick, showEdit } = props;
  const className = metaValue ? '' : 'no-meta-value';

  return (
    <div className="no-meta-value-selected-container">
      <style jsx>{`
        .no-meta-value-selected-container {
          display: flex;
          justify-content: space-between;
        }
        .edit-button {
          padding: 0;
          border: none;
          text-transform: lowercase;
          font-style: normal;
          font-weight: normal;
        }
        .no-meta-value {
          text-transform: uppercase;
        }
      `}</style>
      <div className={className} data-cy="deckBuilderMetaValue">
        {metaValue || `No ${metaName} selected`}
      </div>
      {showEdit && (
        <div>
          <button
            data-cy="editMetaValue"
            className="edit-button call-to-action-chevron"
            onClick={onEditClick}
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
}

DeckCardsTableEditMeta.propTypes = {
  showEdit: PropTypes.bool,
  switchToCards: PropTypes.func,
  setTab: PropTypes.func,
  onEditClick: PropTypes.func,
  metaName: PropTypes.string,
  metaValue: PropTypes.string
};
