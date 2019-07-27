import Layout from '../components/layout';
import AllCards from '../components/all-cards';
import CardList from '../components/card-list';

const pageStyles = `
  .deck-builder-panels {
    color: red;
  }
`;

export default () => (
  <Layout>
    <style jsx>{pageStyles}</style>
    <h1 data-cy="header">Deck Builder</h1>
    <div className="deck-builder-panels">
      <AllCards />
      <div className="deck-in-progress" data-cy="deckInProgress">
        <h2>Current Deck</h2>
        <CardList cards={[]} />
      </div>
    </div>
  </Layout>
);
