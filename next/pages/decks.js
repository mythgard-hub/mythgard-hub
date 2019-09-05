import React from 'react';
import AllDecks from '../components/all-decks';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';
import PageBanner from '../components/page-banner';
import Layout from '../components/layout';

const hasSearch = function(searchQuery) {
  return (
    searchQuery &&
    (searchQuery.name ||
      searchQuery.cardIds ||
      searchQuery.factionNames ||
      searchQuery.updatedTime ||
      searchQuery.authorName)
  );
};

class DecksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(searchQuery) {
    this.setState({ searchQuery });
  }

  render() {
    return (
      <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
        <style jsx>{`
          h1 {
            margin: 20px 0 25px 0;
          }
        `}</style>
        <PageBanner image={PageBanner.IMG_DECKS}>Decks</PageBanner>
        <DeckSearchForm onSubmit={this.handleSearchSubmit.bind(this)} />
        <h1>Results</h1>
        {hasSearch(this.state.searchQuery) ? (
          <SomeDecks search={this.state.searchQuery} />
        ) : (
          <AllDecks />
        )}
      </Layout>
    );
  }
}

export default DecksPage;
