import AllCards from '../components/all-cards';
import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasSearch = () => true;

class CardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout
        title="Mythgard Hub | Cards"
        desc="Browse and search for Mythgard cards"
      >
        <h1>Cards</h1>
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
