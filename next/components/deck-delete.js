import PropTypes from 'prop-types';
import { useCallback, useContext, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import deleteDeck from '../lib/mutations/delete-deck';
import UserContext from '../components/user-context';

let messageTimeoutHandle;

function DeckDelete({ deck, className }) {
  const client = useApolloClient();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const handleClick = useCallback(async () => {
    const msg = `Are you sure? This action cannot be undone.`;
    // Cypress will auto-confirm these dialogues
    if (window.confirm(msg)) {
      clearTimeout(messageTimeoutHandle);
      let resp;
      try {
        resp = await deleteDeck(client, deck.id);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      }
      setMessage(resp ? 'Deck deleted' : 'Unable to delete deck');
      messageTimeoutHandle = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  });

  // Users can only delete decks they authored
  if (!user || !deck || !deck.author || user.id !== deck.author.id) return null;

  return (
    <div className={`deck-delete-container ${className}`}>
      <style jsx>{`
        .deck-delete-container {
          margin-bottom: 10px;
        }
      `}</style>
      <button onClick={handleClick}>Delete</button>
      {message && <span>{message}</span>}
    </div>
  );
}

DeckDelete.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired,
  className: PropTypes.string
};

export default DeckDelete;
