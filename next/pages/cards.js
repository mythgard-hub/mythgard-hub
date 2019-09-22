import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { Component } from 'react';
import CardSearchForm from '../components/card-search-form';

class CardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
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
        <CardSearchForm onSubmit={this.handleSearchSubmit.bind(this)}>
          <style jsx>{`
            :global(.cardList) {
              padding-left: 0;
            }

            @media only screen and (max-width: 925) {
              :global(.cardList) {
                min-width: 535px;
              }
            }
          `}</style>
          <div className="hideOnTablet">
            <SomeCards filters={this.state.searchQuery} />
          </div>
        </CardSearchForm>
        <div className="hideOnNotTablet">
          <SomeCards filters={this.state.searchQuery} />
        </div>
      </Layout>
    );
  }
}

export default CardsPage;
