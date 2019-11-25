import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import gql from 'graphql-tag';

function moderatorControlPanel({ modUser }) {
  const [deckId, setDeckId] = useState(0);
  const [deckDesc, setDeckDesc] = useState('');
  const [deckName, setDeckName] = useState('');
  const onChangeDeckId = handleInputChangeHooks(setDeckId);
  const onChangeDeckDesc = handleInputChangeHooks(setDeckDesc);
  const onChangeDeckName = handleInputChangeHooks(setDeckName);

  const [updateDeck] = useMutation(
    gql`
      mutation updateDeck($deckId: Int!, $deckDesc: String, $deckName: String) {
        updateDeck(
          input: {
            id: $deckId
            patch: { description: $deckDesc, name: $deckName }
          }
        ) {
          deck {
            id
          }
        }
      }
    `,
    {
      update() {
        window.location.reload();
      },
      onError() {
        alert('That failed. Please check values and try again');
      }
    }
  );

  const onClick = () => {
    const variables = { deckId: parseInt(deckId, 10) };
    if (deckDesc) {
      variables.deckDesc = deckDesc;
    }
    if (deckName) {
      variables.deckName = deckName;
    }
    updateDeck({ variables });
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
      <p>Non-Empty Values will be changed</p>
      <label htmlFor="deckId">
        deck Id:{' '}
        <input name="deckId" value={deckId} onChange={onChangeDeckId} />
      </label>
      <label htmlFor="deckName">
        deck name:{' '}
        <input name="deckName" value={deckName} onChange={onChangeDeckName} />
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
