import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import ErrorMessage from './error-message';
import DeckPreview from './deck-preview';
import {
  deckPreviewsToDecks,
  userFavoriteDecksQuery
} from '../lib/deck-queries';

function UserFavoriteDecks({ userId, limit = -1 }) {
  const [showLess, setShowLess] = useState(true);

  const { loading, error, data } = useQuery(userFavoriteDecksQuery, {
    variables: { userId }
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  let decks = [];
  try {
    decks = data.account.deckFavorites.nodes.reduce((acc, curr) => {
      acc.push(curr.deck.deckPreviews.nodes[0]);
      return acc;
    }, []);
  } catch (error) {
    console.error('Lily was right and JavaScript is not to be trusted', error);
  }

  const userDeckCount = decks.length;
  if (showLess && limit !== -1) {
    decks = decks.slice(0, limit);
  }

  decks = deckPreviewsToDecks(decks);
  return (
    <>
      <style jsx>{`
        .deck-list {
          padding: 0 20px;
          list-style: none;
        }
        .view-more {
          font-size: 0.7em;
          margin-top: -5px;
          margin-right: 20px;
          font-weight: 600;
          text-align: right;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
        }
        .view-more-button {
          cursor: pointer;
        }
      `}</style>
      <ul className="deck-list">
        {decks.map((deck, i) => {
          return (
            <li data-cy="user-deck" key={i}>
              <DeckPreview deck={deck} />
            </li>
          );
        })}
      </ul>
      {limit !== -1 && userDeckCount > limit && (
        <div className="view-more">
          <span
            className="view-more-button"
            onClick={() => {
              setShowLess(!showLess);
            }}
          >
            View {showLess ? 'More' : 'Less'}
          </span>
        </div>
      )}
    </>
  );
}

UserFavoriteDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number
};

export default UserFavoriteDecks;
