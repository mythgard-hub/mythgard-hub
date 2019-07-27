import Layout from '../components/layout';
import AllCards from '../components/all-cards';
import CardList from '../components/card-list';

export default () => (
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
        <AllCards />
      </div>
      <div className="deck-in-progress" data-cy="deckInProgress">
        <h2>Current Deck</h2>
        <CardList cards={[]} />
      </div>
    </div>
  </Layout>
);
