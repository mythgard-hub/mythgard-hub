import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Link from 'next/link';

import UserContext from '../components/user-context';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';
import { initializeDeckBuilder, getCardCount } from '../lib/deck-utils';

const saveDeckWithCards = (apolloClient, deckInProgress, authorId) => {
  let deckId;
  return createNewEmptyDeck(apolloClient, deckInProgress, authorId)
    .then(({ data }) => {
      deckId = data.createDeck.deck.id;
      return addCardsToDBDeck(
        apolloClient,
        deckId,
        Object.values(deckInProgress.mainDeck)
      );
    })
    .then(() => deckId);
};

export default function SaveDeck({ deckInProgress, setDeckInProgress }) {
  const { user } = useContext(UserContext);

  const handleSubmit = (e, client) => {
    e && e.preventDefault();

    if (!validateState()) return;

    saveDeckWithCards(client, deckInProgress, user.id).then(deckId => {
      Router.push(`/deck?id=${deckId}`);
      setDeckInProgress(initializeDeckBuilder());
    });
  };

  const validateState = () => {
    return Boolean(deckInProgress.deckName);
  };

  // If user is not logged in, they must do so before saving
  let saveButton;
  if (!user || !user.id) {
    saveButton = (
      <Link href="/auth/google">
        <a className="button" data-cy="saveDeck">
          Login to Save
        </a>
      </Link>
    );
  } else {
    const cardCount = getCardCount(deckInProgress);

    let errorMessage = null;
    if (cardCount < 40) {
      errorMessage = 'A deck must have at least 40 cards';
    } else if (cardCount > 200) {
      errorMessage = 'A deck can have a maximum of 200 cards';
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
            Save
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
  deckInProgress: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckPath: PropTypes.shape({
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
