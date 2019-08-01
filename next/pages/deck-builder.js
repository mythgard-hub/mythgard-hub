import React from 'react';
import Layout from '../components/layout';
import AllCards from '../components/all-cards';
import DeckCardList from '../components/deck-card-list';
import { handleInputChange } from '../lib/form-utils';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

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

class DeckBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInProgress: [],
      deckName: ''
    };

    this.onCollectionClick = this.onCollectionClick.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, client) {
    e && e.preventDefault();

    if (!this.state.deckName) {
      return;
    }
    const deckInProgress = this.state.deckInProgress;
    let deckId;
    client
      .mutate({
        mutation: addDeckQuery,
        variables: { name: this.state.deckName }
      })
      .then(function({ data: { createDeck } }) {
        deckId = createDeck.deck.id;
        return Promise.all(
          deckInProgress.map(card => {
            client.mutate({
              mutation: addCardDeck,
              variables: {
                cardId: card.id,
                deckId
              }
            });
          })
        ).then(() => {
          Router.push(`/deck?id=${deckId}`);
        });
      });

    this.setState({
      deckInProgress: [],
      deckName: ''
    });
  }

  onCollectionClick(e, card) {
    e && e.preventDefault();
    this.setState({
      deckInProgress: [...this.state.deckInProgress, card]
    });
  }

  render() {
    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default DeckBuilder;
