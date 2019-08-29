import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { Component } from 'react';
import CardSearchForm from '../components/card-search-form';

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
        <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
        <CardSearchForm onSubmit={this.handleSearchSubmit.bind(this)} />
        <SomeCards filters={this.state.searchQuery} />
      </Layout>
    );
  }
}

export default CardsPage;
