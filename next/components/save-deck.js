import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Link from 'next/link';
import { saveDeckWithCards } from '../lib/deck-utils.js';
import UserContext from '../components/user-context';
import { initializeDeckBuilder } from '../lib/deck-utils';

export default function SaveDeck({
  deckId,
  deckInProgress,
  setDeckInProgress
}) {
  const { user } = useContext(UserContext);

  const handleSubmit = (e, client) => {
    e && e.preventDefault();

    if (!validateState()) return;

    saveDeckWithCards(client, deckId, deckInProgress, user.id).then(
      savedDeckId => {
        Router.push(`/deck?id=${savedDeckId}`);
        setDeckInProgress(initializeDeckBuilder());
      }
    );
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
    saveButton = (
      <ApolloConsumer>
        {client => (
          <button
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
