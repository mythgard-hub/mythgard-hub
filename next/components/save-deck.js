import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from '@apollo/react-common';
import Router from 'next/router';
import Link from 'next/link';
import { saveDeckWithCards } from '../lib/deck-utils.js';
import UserContext from '../components/user-context';
import { clearDeckInProgress, getCardCount } from '../lib/deck-utils';
import { DECK_SIZES } from '../constants/deck.js';

export default function SaveDeck({
  deckId,
  deckInProgress,
  setDeckInProgress
}) {
  const { user } = useContext(UserContext);
  const cardCount = getCardCount(deckInProgress);

  const handleSubmit = (e, client) => {
    e && e.preventDefault();

    if (!validateState()) return;

    saveDeckWithCards(client, deckId, deckInProgress, user.id).then(
      savedDeckId => {
        Router.push(`/deck?id=${savedDeckId}`);
        clearDeckInProgress(setDeckInProgress);
      }
    );
  };

  const validateState = () => {
    return Boolean(
      deckInProgress.deckName &&
        (cardCount >= DECK_SIZES.MIN) & (cardCount <= DECK_SIZES.MAX)
    );
  };

  // If user is not logged in, they must do so before saving
  let saveButton;
  if (!user || !user.id) {
    saveButton = (
      <Link href="/auth/google">
        <a className="button" data-cy="saveDeck">
          Save
        </a>
      </Link>
    );
  } else {
    let errorMessage = null;
    if (cardCount < DECK_SIZES.MIN) {
      errorMessage = `A deck must have at least ${DECK_SIZES.MIN} cards`;
    } else if (cardCount > DECK_SIZES.MAX) {
      errorMessage = `A deck can have a maximum of ${DECK_SIZES.MAX} cards`;
    }

    saveButton = (
      <ApolloConsumer>
        {client => (
          <button
            disabled={errorMessage}
            title={errorMessage}
            type="submit"
            data-cy="saveDeck"
            onClick={e => {
              handleSubmit(e, client);
            }}
          >
            {Number.isInteger(deckId) ? 'Update' : 'Save'}
          </button>
        )}
      </ApolloConsumer>
    );
  }

  return (
    <div className="save-deck-container">
      <style jsx>{`
        .save-deck-container {
          margin-bottom: 10px;
        }
      `}</style>
      {saveButton}
    </div>
  );
}

SaveDeck.propTypes = {
  deckId: PropTypes.number,
  deckInProgress: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckPower: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  }),
  setDeckInProgress: PropTypes.func.isRequired
};
