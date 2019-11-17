import SomeCards from '../components/some-cards.js';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { useState } from 'react';
import CardSearchForm from '../components/card-search-form';
import { useRouter } from 'next/router';
import queryToParams from '../lib/url-to-search-parameters.js';

const searchQueryDefaults = {
  text: '',
  factions: [],
  supertypes: [],
  manaCosts: [],
  strengths: [],
  defenses: [],
  rarities: []
};

function CardsPage() {
  const router = useRouter();
  const urlSearchQuery = queryToParams(searchQueryDefaults, router.query);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    const pageParams = new URLSearchParams(searchQuery).toString();
    router.replace(`/cards?${pageParams}`);
  };

  const clearFilters = () => {
    setSearchQuery({ ...searchQueryDefaults });
    router.replace(`/cards`);
  };

  return (
    <Layout
      title="Mythgard Hub | Cards"
      desc="Browse and search for Mythgard cards"
    >
      <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
      <CardSearchForm
        onSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        defaultQuery={{ ...searchQueryDefaults }}
        onClearFilters={clearFilters}
      >
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
