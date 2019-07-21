import React from 'react';
import AllDecks from '../components/all-decks';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';

const hasSearch = function(searchQuery) {
  return searchQuery && searchQuery.name;
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
      <>
        <h1>Decks</h1>
        <DeckSearchForm onSubmit={this.handleSearchSubmit.bind(this)} />
        {hasSearch(this.state.searchQuery) ? (
          <SomeDecks search={this.state.searchQuery} />
        ) : (
          <AllDecks />
        )}
      </>
    );
  }
}

export default DecksPage;
