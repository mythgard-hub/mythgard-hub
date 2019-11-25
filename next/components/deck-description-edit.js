import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import UserContext from '../components/user-context';
import ReactMarkdown from 'react-markdown';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import ErrorMessage from '../components/error-message';
import { updateDeck as deckQuery } from '../lib/deck-queries.js';

function DeckDescriptionEdit({ deck }) {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [newDeckDesc, setNewDeckDesc] = useState(deck.description);
  const [errorMsg, setErrorMsg] = useState('');
  const onChangeDeckDesc = handleInputChangeHooks(setNewDeckDesc);

  const canEdit =
    user && deck && deck.id && deck.author && user.id === deck.author.id;

  const [updateDeck] = useMutation(deckQuery, {
    update() {
      window.location.reload();
    },
    onError() {
      setErrorMsg('Error updating deck description.');
    }
  });

  const placeholder = `Markdown format is supported.  Example:

This deck is from [this tournament](http://mythgardhub.com/events/).

* Burn cards
* Play cards
`;

  const inputForm = (
    <div>
      <style jsx>{`
        textarea {
          width: 100%;
          min-height: 100px;
          margin: 10px 0;
        }
      `}</style>
      <div>
        <textarea
          name="deckDesc"
          value={newDeckDesc}
          placeholder={placeholder}
          onChange={onChangeDeckDesc}
        ></textarea>
      </div>
    </div>
  );

  const editButton = (
    <div>
      <button className="ddeButton" onClick={() => setEditMode(true)}>
        Edit Description
      </button>
    </div>
  );

  const onSave = () => {
    const variables = {
      deckDesc: newDeckDesc,
      deckId: parseInt(deck.id, 10)
    };
    updateDeck({ variables });
    setEditMode(false);
  };

  const saveButton = (
    <button className="ddeButton" onClick={onSave}>
      Save Description
    </button>
  );

  const deckDescriptionRendered = (
    <div>
      <ReactMarkdown source={deck.description || 'No description'} />
    </div>
  );

  const errorMsgRendered = <ErrorMessage>errorMsg</ErrorMessage>;

  return (
    <div>
      <style jsx>{`
        :global(.ddeButton) {
          width: auto;
          margin: 10px 0;
        }
      `}</style>

      {errorMsg && errorMsgRendered}
      {!editMode && deckDescriptionRendered}
      {!editMode && canEdit && editButton}
      {editMode && inputForm}
      {editMode && saveButton}
    </div>
  );
}

DeckDescriptionEdit.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired
};

export default DeckDescriptionEdit;
