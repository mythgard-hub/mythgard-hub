import PropTypes from 'prop-types';
import { useCallback, useContext, useState } from 'react';
import upvoteDeckMutation from '../lib/mutations/deck-upvote.js';
import removeDeckUpvoteMutation from '../lib/mutations/deck-remove-upvote.js';
import UserContext from '../components/user-context';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

const deckVotesQuery = gql`
  query deckAccountVotes($deckId: Int!, $accountId: Int!) {
    deckVotes(
      filter: {
        deckId: { equalTo: $deckId }
        accountId: { equalTo: $accountId }
      }
    ) {
      nodes {
        id
      }
    }
  }
`;

let messageTimeoutHandle;

function DeckVote({ deck }) {
  const { user } = useContext(UserContext);
  const [upvoteDeck] = useMutation(upvoteDeckMutation);
  const [undoDeckUpvote] = useMutation(removeDeckUpvoteMutation);
  const { data } = useQuery(deckVotesQuery, {
    variables: {
      deckId: deck.id,
      accountId: user && user.id
    }
  });
  const userDeckVote =
    data && data.deckVotes && data.deckVotes.nodes && data.deckVotes.nodes[0];
  const [message, setMessage] = useState(null);

  const handleUpvote = useCallback(async () => {
    clearTimeout(messageTimeoutHandle);
    let resp;
    try {
      resp = await upvoteDeck({
        variables: {
          deckId: deck.id,
          accountId: user.id
        }
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    }
    setMessage(resp ? 'Vote Successful' : 'Error voting');
    messageTimeoutHandle = setTimeout(() => {
      setMessage(null);
    }, 2000);
  });

  const handleRemoveVote = useCallback(async () => {
    clearTimeout(messageTimeoutHandle);
    let resp;
    try {
      resp = await undoDeckUpvote({
        variables: { deckVoteId: userDeckVote.id }
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    }
    setMessage(resp ? 'Unvote Successful' : 'Error removing vote');
    messageTimeoutHandle = setTimeout(() => {
      setMessage(null);
    }, 2000);
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
      <span data-cy="deckVoteCount" className="voteCount">
        {votes}
      </span>
      {canVote && !userDeckVote && <button onClick={handleUpvote}>Vote</button>}
      {userDeckVote && <button onClick={handleRemoveVote}>Remove Vote</button>}
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
