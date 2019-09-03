import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';

import UserContext from '../components/user-context';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';

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

export default function SaveDeck({ deckInProgress }) {
  const { user } = useContext(UserContext);

  const handleSubmit = (e, client) => {
    e && e.preventDefault();

    if (!user || !user.id) {
      alert('You are not logged in. You will be dealt with in another PR');
      return;
    }

    if (!validateState()) return;

    saveDeckWithCards(client, deckInProgress, user.id).then(deckId => {
      Router.push(`/deck?id=${deckId}`);
    });
  };

  const validateState = () => {
    return Boolean(deckInProgress.deckName);
  };

  return (
    <div className="save-deck-container">
      <style jsx>{`
        .save-deck-container {
          margin-bottom: 10px;
        }
      `}</style>
      <ApolloConsumer>
        {client => (
          <input
            type="submit"
            value="Save"
            data-cy="saveDeck"
            onClick={e => {
              handleSubmit(e, client);
            }}
          />
        )}
      </ApolloConsumer>
    </div>
  );
}

SaveDeck.propTypes = {
  deckInProgress: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.string,
    deckPower: PropTypes.string,
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
