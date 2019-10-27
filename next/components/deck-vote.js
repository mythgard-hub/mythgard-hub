import PropTypes from 'prop-types';
import { useCallback, useContext, useState } from 'react';
// import { ApolloContext } from 'react-apollo';
// import deleteDeck from '../lib/mutations/delete-deck';
import UserContext from '../components/user-context';

let messageTimeoutHandle;

function DeckVote({ deck }) {
  // const { client } = useContext(ApolloContext);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const handleClick = useCallback(async () => {
    const msg = `Are you sure? This action cannot be undone.`;
    // Cypress will auto-confirm these dialogues
    if (window.confirm(msg)) {
      clearTimeout(messageTimeoutHandle);
      let resp;
      try {
        // resp = await deleteDeck(client, deck.id);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      }
      setMessage(resp ? 'Vote Successful' : 'Unable to vote');
      messageTimeoutHandle = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  });

  const canVote = user && user.id !== deck.author.id;

  const votes =
    deck &&
    deck.deckPreviews &&
    deck.deckPreviews.nodes &&
    deck.deckPreviews.nodes.length &&
    deck.deckPreviews.nodes[0].votes;

  return (
    <div className="deck-vote-container">
      <style jsx>{`
        .deck-vote-container {
          margin-bottom: 10px;
        }
      `}</style>
      <span className="voteCount">{votes}</span>
      {canVote && <button onClick={handleClick}>Vote</button>}
      {message && <span>{message}</span>}
    </div>
  );
}

DeckVote.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number
    }),
    deckPreviews: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          votes: PropTypes.number
        })
      )
    })
  }).isRequired
};

export default DeckVote;
