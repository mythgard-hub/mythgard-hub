import React, { useState } from 'react';
import ErrorMessage from '../components/error-message';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';
import PageBanner from '../components/page-banner';
import AllDecks from '../components/all-decks.js';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import allCardsQuery from '../lib/queries/all-cards-query';
import queryToParams from '../lib/url-to-search-parameters.js';
import { searchParamsPostProcessNumArray as postProcessNumArray } from '../lib/url-to-search-parameters.js';

const defaultUpdatedTime = '150';

const searchQueryDefaults = {
  name: '',
  cardIds: [],
  factionNames: [],
  isOnlyFactions: true,
  archetype: null,
  type: null,
  updatedTime: defaultUpdatedTime,
  authorName: '',
  sortBy: 'dateDesc'
};

const cardsErr = 'Error initializing deck seach';

export default function DecksPage() {
  const router = useRouter();
  const urlSearchQuery = queryToParams(searchQueryDefaults, router.query);
  postProcessNumArray(urlSearchQuery, 'cardIds');
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const { error, data, loading } = useQuery(allCardsQuery);

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    const pageParams = new URLSearchParams(searchQuery).toString();
    router.replace(`/decks?${pageParams}`);
  };

  const clearFilters = () => {
    setSearchQuery({ ...searchQueryDefaults });
    router.replace(`/decks`);
  };

  const hasQuery = Object.entries(router.query).length > 0;

  return (
    <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
      <style jsx>{`
        h1 {
          margin: 20px 0 25px 0;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECKS}>Decks</PageBanner>

      {error && <ErrorMessage message={cardsErr} />}
      {!loading && (
        <DeckSearchForm
          onSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          defaultQuery={{ ...searchQueryDefaults }}
          allCards={data}
          onClearFilters={clearFilters}
        />
      )}
      <h1>Results</h1>
      {hasQuery && <SomeDecks search={searchQuery} />}
      {!hasQuery && <AllDecks defaultDaysAgo={defaultUpdatedTime} />}
    </Layout>
  );
}
