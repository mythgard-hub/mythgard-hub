import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { useState } from 'react';
import CardSearchForm from '../components/card-search-form';

export const twoColMinWidth = 925;

function CardsPage() {
  const [searchQuery, setSearchQuery] = useState({});

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Layout
      title="Mythgard Hub | Cards"
      desc="Browse and search for Mythgard cards"
    >
      <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
      <CardSearchForm onSubmit={handleSearchSubmit.bind(this)}>
        <style jsx>{`
          :global(.cardList) {
            padding-left: 0;
          }

          @media only screen and (max-width: ${twoColMinWidth}px) {
            :global(.cardList) {
              min-width: 535px;
            }
          }
        `}</style>
        <div className="hideOnTablet">
          <SomeCards filters={searchQuery} />
        </div>
      </CardSearchForm>
      <div className="hideOnNotTablet">
        <SomeCards filters={searchQuery} />
      </div>
    </Layout>
  );
}

export default CardsPage;
