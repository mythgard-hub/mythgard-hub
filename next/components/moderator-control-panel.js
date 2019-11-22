import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import gql from 'graphql-tag';

function moderatorControlPanel({ modUser }) {
  const [deckId, setDeckId] = useState(0);
  const [deckDesc, setDeckDesc] = useState('');
  const onChangeDeckId = handleInputChangeHooks(setDeckId);
  const onChangeDeckDesc = handleInputChangeHooks(setDeckDesc);

  const [updateDeck] = useMutation(
    gql`
      mutation updateDeck($deckId: Int!, $deckDesc: String!) {
        updateDeck(input: { id: $deckId, patch: { description: $deckDesc } }) {
          deck {
            id
          }
        }
      }
    `,
    {
      update() {
        alert('please refresh the page to see updates');
      }
    }
  );

  const onClick = () => {
    updateDeck({ variables: { deckId: parseInt(deckId, 10), deckDesc } });
  };

  return (
    <div>
      <style jsx>{`
        label {
          display: block;
          margin: 10px 0;
        }
        button {
          display: inline-block;
          width: auto;
        }
      `}</style>
      <h2>Modify any deck</h2>
      <label htmlFor="deckId">
        deck Id:{' '}
        <input name="deckId" value={deckId} onChange={onChangeDeckId} />
      </label>
      <label htmlFor="deckDesc">
        deck description:{' '}
        <textarea
          name="deckDesc"
          value={deckDesc}
          onChange={onChangeDeckDesc}
        />
      </label>
      <button type="submit" onClick={onClick}>
        Submit
      </button>
    </div>
  );
}

moderatorControlPanel.propTypes = {
  modUser: PropTypes.object
};

export default moderatorControlPanel;
