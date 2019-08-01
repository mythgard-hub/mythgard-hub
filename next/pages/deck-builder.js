import React from 'react';
import AllCards from '../components/all-cards';
import Layout from '../components/layout';
import ImportedDeck from '../components/imported-deck';
import DeckCardList from '../components/deck-card-list';
import { handleInputChange } from '../lib/form-utils';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import DeckExport from '../components/deck-export';
import {
  convertImportToDeck,
  initializeImportedDeck
} from '../lib/import-utils';

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
  mutation CreateCardDeck($deckId: Int!, $cardId: Int!) {
    createCardDeck(input: { cardDeck: { deckId: $deckId, cardId: $cardId } }) {
      cardDeck {
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
const addCardsToDeck = (apolloClient, deckId, cards) => {
  return Promise.all(
    cards.map(card => {
      apolloClient.mutate({
        mutation: addCardDeck,
        variables: {
          cardId: card.id,
          deckId
        }
      });
    })
  );
};

const saveDeck = (apolloClient, deckInProgress, deckName) => {
  let deckId;
  return createDeckShell(apolloClient, deckName)
    .then(({ data }) => {
      deckId = data.createDeck.deck.id;
      return addCardsToDeck(apolloClient, deckId, deckInProgress);
    })
    .then(() => deckId);
};

class DeckBuilderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInProgress: [],
      mainDeckInput: '',
      sideboardInput: '',
      deckName: '',
      importedDeck: initializeImportedDeck()
    };

    this.onCollectionClick = this.onCollectionClick.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImport = this.handleImport.bind(this);
    this.validateState = this.validateState.bind(this);
  }

  handleSubmit(e, client) {
    e && e.preventDefault();

    if (!this.validateState()) {
      return;
    }

    const { deckInProgress, deckName } = this.state;

    saveDeck(client, deckInProgress, deckName).then(deckId => {
      Router.push(`/deck?id=${deckId}`);
    });
  }

  onCollectionClick(e, card) {
    e && e.preventDefault();
    this.setState({
      deckInProgress: [...this.state.deckInProgress, card]
    });
  }

  handleImport() {
    const { mainDeckInput, sideboardInput } = this.state;
    this.setState({
      importedDeck: convertImportToDeck(mainDeckInput, sideboardInput)
    });
  }

  validateState() {
    if (!this.state.deckName) {
      return false;
    }
    return true;
  }

  render() {
    const { importedDeck, mainDeckInput, sideboardInput } = this.state;

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
                  onChange={this.handleInputChange}
                  value={this.state.deckName}
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
        <div className="deck-builder-panels">
          <div className="collection">
            <h2>Collection</h2>
            <AllCards onCardClick={this.onCollectionClick} />
          </div>
          <div className="deck-in-progress" data-cy="deckInProgress">
            <h2>Current Deck</h2>
            <DeckCardList cards={this.state.deckInProgress} />
          </div>
        </div>
        {/* TODO - wire up this part with code above */}
        <h2>Import Deck</h2>
        <h3>Main Deck</h3>
        <textarea
          cols="40"
          rows="10"
          value={mainDeckInput}
          name="mainDeckInput"
          onChange={this.handleInputChange}
        />
        <h3>Sideboard</h3>
        <textarea
          cols="40"
          rows="5"
          value={sideboardInput}
          name="sideboardInput"
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        <button onClick={this.handleImport}>Import</button>
        &nbsp;
        <DeckExport textToExport={importedDeck.asText} />
        <ImportedDeck importedDeck={importedDeck} />
      </Layout>
    );
  }
}

export default DeckBuilderPage;
