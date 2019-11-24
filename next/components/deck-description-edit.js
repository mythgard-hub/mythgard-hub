import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import UserContext from '../components/user-context';
import ReactMarkdown from 'react-markdown';
import gql from 'graphql-tag';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function DeckDescriptionEdit({ deck }) {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [newDeckDesc, setNewDeckDesc] = useState(deck.description);
  const onChangeDeckDesc = handleInputChangeHooks(setNewDeckDesc);

  // Users can only delete decks they authored
  if (!user || !deck || !deck.id || !deck.author || user.id !== deck.author.id)
    return null;

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

  const input = (
    <div>
      <style jsx>{`
        textarea {
          width: 100%;
          height: 50px;
          margin: 10px 0;
        }
      `}</style>
      Markdown format is supported.
      <div>
        <textarea
          name="deckDesc"
          value={newDeckDesc}
          onChange={onChangeDeckDesc}
        ></textarea>
      </div>
    </div>
  );

  const editButton = (
    <div>
      <style jsx>{`
        button {
          width: auto;
        }
      `}</style>
      <button onClick={() => setEditMode(true)}>Edit</button>
    </div>
  );

  const onSave = () => {
    const variables = {
      description: newDeckDesc,
      deckId: parseInt(deck.id, 10)
    };
    updateDeck({ variables });
    setEditMode(false);
  };
  const saveButton = <button onClick={onSave}>Save</button>;

  const deckDescriptionRendered = (
    <div>
      <ReactMarkdown source={deck.description} />
    </div>
  );

  return (
    <div>
      {!editMode && editButton}
      {!editMode && deckDescriptionRendered}
      {editMode && input}
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
