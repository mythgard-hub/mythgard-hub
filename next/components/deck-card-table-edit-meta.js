import PropTypes from 'prop-types';

export default function DeckCardsTableEditMeta(props) {
  const { metaName, metaValue, onEditClick } = props;

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
        .edit-button:before {
          text-decoration: none;
          content: '\u25b6';
          margin-right: 3px;
          font-size: 10px;
        }
        .no-meta-value {
          text-transform: uppercase;
        }
      `}</style>
      {metaValue || <div className="no-meta-value">No {metaName} selected</div>}
      <div>
        <button
          data-cy="editMetaValue"
          className="edit-button"
          onClick={onEditClick}
        >
          edit
        </button>
      </div>
    </div>
  );
}

DeckCardsTableEditMeta.propTypes = {
  switchToCards: PropTypes.func,
  setTab: PropTypes.func,
  onEditClick: PropTypes.func
};
