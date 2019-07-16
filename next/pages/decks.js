import React from 'react';
import Layout from '../components/layout';
import AllDecks from '../components/all-decks';
import DeckSearchForm from '../components/deck-search-form';
import PropTypes from 'prop-types';

class DecksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(search) {
    this.setState({ search });
  }

  render() {
    return (
      <Layout>
        <h1>Decks</h1>
        <DeckSearchForm onSubmit={this.handleSearchSubmit.bind(this)} />
        <AllDecks search={this.props.search} />
      </Layout>
    );
  }
}
DecksPage.propTypes = {
  search: PropTypes.object
};

export default DecksPage;
