import AllCards from '../components/all-cards';
import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardSearchForm from '../components/card-search-form';

const hasSearch = function(searchQuery) {
  return searchQuery && searchQuery.text;
};

class CardsPage extends Component {
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
      <Layout
        title="Mythgard Hub | Cards"
        desc="Browse and search for Mythgard cards"
      >
        <h1>Cards</h1>
        <CardSearchForm onSubmit={this.handleSearchSubmit.bind(this)} />
        {hasSearch(this.state.searchQuery) ? (
          <div>some cards</div>
        ) : (
          // <SomeCards search={this.state.searchQuery} />
          <AllCards />
        )}
      </Layout>
    );
  }
}

CardsPage.propTypes = {
  // children: PropTypes.node,
  // className: PropTypes.string,
};

export default CardsPage;
