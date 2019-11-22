import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import DeckPreview from './deck-preview';
import { userDecksQuery, deckPreviewsToDecks } from '../lib/deck-queries';

function UserDecks({ userId, limit }) {
  const [showLess, setShowLess] = useState(true);

  const { loading, error, data } = useQuery(userDecksQuery, {
    variables: { authorId: userId }
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  let decks = [];
  try {
    decks = data.decks.nodes.reduce((acc, curr) => {
      acc.push(curr.deckPreviews.nodes[0]);
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
        .view-more-button:before {
          text-decoration: none;
          content: '\u25b6';
          font-size: 80%;
          margin-right: 5px;
        }
      `}</style>
      <ul className="deck-list">
        {decks.map((deck, i) => {
          return (
            <li key={i}>
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

UserDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number
};

UserDecks.defaultProps = {
  limit: -1
};

export default UserDecks;
