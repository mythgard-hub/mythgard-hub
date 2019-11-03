import { useContext } from 'react';
import PropTypes from 'prop-types';

export default function DeckCardsTableEditMeta({ metaName, metaValue }) {
  return (
    metaValue || (
      <div className="no-meta-value-selected-container">
        <style jsx>{`
          .no-meta-value-selected-container {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
        <div>No {metaName} selected</div>
        <div>
          <button>edit</button>
        </div>
      </div>
    )
  );
}

DeckCardsTableEditMeta.propTypes = {
  switchToCards: PropTypes.func,
  setTab: PropTypes.func
};
