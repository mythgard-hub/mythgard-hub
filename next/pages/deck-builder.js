import React from 'react';
import AllCards from '../components/all-cards';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import ImportDeck from '../components/import-deck';
import CardList from '../components/card-list';
import { handleInputChange } from '../lib/form-utils';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import DeckExport from '../components/deck-export';
import { convertImportToDeck } from '../lib/import-utils';
import { initializeDeckBuilder } from '../lib/deck-utils';
import DeckCardList from '../components/deck-card-list';

const addDeckQuery = gql`
  mutation AddDeck($name: String!) {
    createDeck(input: { deck: { name: $name } }) {
      deck {
        name
        id
      }
    }
  }
`;

const addCardDeck = gql`
  mutation CreateCardDeck($deckId: Int!, $cardId: Int!, $quantity: Int!) {
    createCardDeck(
      input: {
        cardDeck: { deckId: $deckId, cardId: $cardId, quantity: $quantity }
      }
    ) {
      cardDeck {
        quantity
        deckId
        cardId
      }
    }
  }
`;

const createDeckShell = (apolloClient, deckName) => {
  return apolloClient.mutate({
    mutation: addDeckQuery,
    variables: { name: deckName }
  });
};

// Graphql query batching is used to prevent request flurry
const addCardsToDeck = (apolloClient, deckId, deckCards) => {
  return Promise.all(
    deckCards.map(deckCard => {
      apolloClient.mutate({
        mutation: addCardDeck,
        variables: {
          quantity: deckCard.quantity,
          cardId: deckCard.card.id,
          deckId
        }
      });
    })
  );
};

const saveDeck = (apolloClient, deckInProgress) => {
  let deckId;
  return createDeckShell(apolloClient, deckInProgress.deckName)
    .then(({ data }) => {
      deckId = data.createDeck.deck.id;
      return addCardsToDeck(
        apolloClient,
        deckId,
        Object.values(deckInProgress.mainDeck)
      );
    })
    .then(() => deckId);
};

class DeckBuilderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainDeckInput: '',
      sideboardInput: '',
      deckInProgress: initializeDeckBuilder()
    };

    this.onCollectionClick = this.onCollectionClick.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImport = this.handleImport.bind(this);
    this.validateState = this.validateState.bind(this);
    this.updateDeckName = this.updateDeckName.bind(this);
  }

  updateDeckName = e => {
    const { deckInProgress } = this.state;
    this.setState({
      deckInProgress: {
        ...deckInProgress,
        deckName: e.target.value
      }
    });
  };

  handleSubmit(e, client) {
    e && e.preventDefault();

    if (!this.validateState()) {
      return;
    }

    const { deckInProgress } = this.state;

    saveDeck(client, deckInProgress).then(deckId => {
      Router.push(`/deck?id=${deckId}`);
    });
  }

  onCollectionClick(e, card) {
    const { deckInProgress } = this.state;
    e && e.preventDefault();

    const nextMainDeck = { ...deckInProgress.mainDeck };
    if (!nextMainDeck.hasOwnProperty(card.id)) {
      nextMainDeck[card.id] = { quantity: 1, card };
    } else {
      nextMainDeck[card.id] = {
        ...nextMainDeck[card.id],
        quantity: nextMainDeck[card.id].quantity + 1
      };
    }

    this.setState({
      deckInProgress: {
        ...deckInProgress,
        mainDeck: nextMainDeck
      }
    });
  }

  handleImport() {
    const { mainDeckInput, deckInProgress } = this.state;

    const importedDeck = convertImportToDeck(mainDeckInput, '');
    importedDeck.mainDeck = {
      ...deckInProgress.mainDeck,
      ...importedDeck.mainDeck
    };

    this.setState({
      deckInProgress: importedDeck
    });
  }

  validateState() {
    return Boolean(this.state.deckInProgress.deckName);
  }

  render() {
    const { deckInProgress, mainDeckInput } = this.state;

    return (
      <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
        <style jsx>{`
          .deck-builder-panels {
            display: flex;
            align-items: flex-start;
          }
          .collection {
            flex-grow: 1;
          }
        `}</style>
        <h1 data-cy="header">Deck Builder</h1>
        <ApolloConsumer>
          {client => (
            <>
              <label>
                Deck Name:{' '}
                <input
                  data-cy="deckTitle"
                  type="text"
                  name="deckName"
                  onChange={this.updateDeckName}
                  value={deckInProgress.deckName}
                />
              </label>
              <input
                type="submit"
                value="Save Deck"
                data-cy="saveDeck"
                onClick={e => {
                  this.handleSubmit(e, client);
                }}
              />
            </>
          )}
        </ApolloConsumer>
        <button
          onClick={() =>
            this.setState({ deckInProgress: initializeDeckBuilder() })
          }
        >
          Clear All
        </button>
        <div className="deck-builder-panels">
          <div className="collection">
            <h2>Collection</h2>
            <AllCards onCardClick={this.onCollectionClick} />
          </div>
          <div className="deck-in-progress" data-cy="deckInProgress">
            <h2>Current Deck</h2>
            <DeckCardList deckCards={Object.values(deckInProgress.mainDeck)} />
          </div>
        </div>
        <ImportDeck
          mainDeckInput={mainDeckInput}
          handleInputChange={this.handleInputChange}
          handleImport={this.handleImport}
        />
        &nbsp;
        <DeckExport textToExport={deckInProgress.asText} />
        <ImportedDeckErrors importedDeck={deckInProgress} />
      </Layout>
    );
  }
}

export default DeckBuilderPage;
