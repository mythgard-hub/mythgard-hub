import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import createNewEmptyDeck from '../lib/mutations/add-deck';
import addCardsToDBDeck from '../lib/mutations/add-card-to-deck';

const saveDeckWithCards = (apolloClient, deckInProgress) => {
  let deckId;
  return createNewEmptyDeck(apolloClient, deckInProgress.deckName)
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
  const handleSubmit = (e, client) => {
    e && e.preventDefault();
    if (!validateState()) return;

    saveDeckWithCards(client, deckInProgress).then(deckId => {
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
