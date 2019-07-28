import React from 'react';
import Layout from '../components/layout';
import AllCards from '../components/all-cards';
import DeckCardList from '../components/deck-card-list';

class DeckBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInProgress: []
    };

    this.onCollectionClick = this.onCollectionClick.bind(this);
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
