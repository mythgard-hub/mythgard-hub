import PropTypes from 'prop-types';
import { useCallback, useContext, useState } from 'react';
import upvoteDeckMutation from '../lib/mutations/deck-upvote.js';
import removeDeckUpvoteMutation from '../lib/mutations/deck-remove-upvote.js';
import UserContext from '../components/user-context';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ErrorMessage from './error-message.js';

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
        __typename
      }
      __typename
    }
  }
`;

const cacheVote = (cache, id, deckId, accountId) => {
  const nodes = id ? [{ id, __typename: 'DeckVote' }] : [];
  cache.writeQuery({
    query: deckVotesQuery,
    variables: { deckId, accountId },
    data: { deckVotes: { nodes, __typename: 'DeckVotesConnection' } }
  });
};

const voteError = 'Error changing vote';

function DeckVote({ deck }) {
  const { user } = useContext(UserContext);
  const [upvoteDeck] = useMutation(upvoteDeckMutation, {
    update(cache, { data }) {
      cacheVote(cache, data.createDeckVote.deckVote.id, deck.id, user.id);
    }
  });
  const [undoDeckUpvote] = useMutation(removeDeckUpvoteMutation, {
    update(cache) {
      cacheVote(cache, 0, deck.id, user.id);
    }
  });
  const { data } = useQuery(deckVotesQuery, {
    variables: {
      deckId: deck.id,
      accountId: user && user.id
    }
  });
  const userDeckVote =
    data && data.deckVotes && data.deckVotes.nodes && data.deckVotes.nodes[0];
  const [errorMessage, setErrorMessage] = useState(null);
  const [voteCountModifier, setVoteCountModifier] = useState(0);

  const handleUpvote = useCallback(async () => {
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
    if (!resp) {
      setErrorMessage(voteError);
    } else {
      setVoteCountModifier(voteCountModifier + 1);
    }
  });

  const handleRemoveVote = useCallback(async () => {
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
    if (!resp) {
      setErrorMessage(voteError);
    } else {
      setVoteCountModifier(voteCountModifier - 1);
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
      <span data-cy="deckVoteCount" className="voteCount">
        {votes + voteCountModifier}
      </span>
      {canVote && !userDeckVote && <button onClick={handleUpvote}>Vote</button>}
      {userDeckVote && <button onClick={handleRemoveVote}>Remove Vote</button>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
