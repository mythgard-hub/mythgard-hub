import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import UserContext from '../components/user-context';

function DeckDescriptionEdit({ deck }) {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  // Users can only delete decks they authored
  // if (!user || !deck || !deck.id || !deck.author || user.id !== deck.author.id)
  //   return null;

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
        <textarea id="" name="">
          {deck.description}
        </textarea>
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
  const saveButton = <button onClick={() => setEditMode(false)}>Save</button>;

  return (
    <div>
      {!editMode && editButton}
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
