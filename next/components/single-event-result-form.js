import { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';

export default function SingleEventResultForm({
  onSave,
  existingResult = {},
  label = 'Update',
  children
}) {
  const [rank, setRank] = useState(existingResult.rank || 0);
  const [pilot, setPilot] = useState(existingResult.pilot || '');
  const [deckId, setDeckId] = useState(existingResult.deckId || -1);

  const saveResult = () =>
    onSave({
      rank: parseInt(rank, 10),
      pilot,
      deckId: parseInt(deckId, 10),
      id: existingResult.id
    });

  return (
    <div>
      <style jsx>{`
        .singleEventResultForm {
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;
        }
        label,
        button {
          white-space: nowrap;
          margin: 0px 20px;
        }
      `}</style>
      <div className="singleEventResultForm">
        <label>
          Rank:{' '}
          <input
            type="number"
            value={rank}
            onChange={handleInputChangeHooks(setRank)}
          />
        </label>
        <label>
          <input
            placeholder="pilot"
            value={pilot}
            onChange={handleInputChangeHooks(setPilot)}
          />
        </label>
        <label>
          DeckId:{' '}
          <input
            type="number"
            value={deckId}
            onChange={handleInputChangeHooks(setDeckId)}
          />
        </label>
        <button onClick={saveResult}>{label}</button>
        {children}
      </div>
    </div>
  );
}

SingleEventResultForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  existingResult: PropTypes.shape({
    rank: PropTypes.number,
    pilot: PropTypes.string,
    deckId: PropTypes.number
  }),
  label: PropTypes.string,
  children: PropTypes.element
};
