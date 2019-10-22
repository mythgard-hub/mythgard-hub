import React, { useState } from 'react';
import ErrorMessage from '../components/error-message';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';
import PageBanner from '../components/page-banner';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-apollo-hooks';
import allCardsQuery from '../lib/queries/all-cards-query';

const searchQueryDefaults = {
  name: '',
  cardIds: [],
  factionNames: [],
  isOnlyFactions: true,
  updatedTime: '150',
  authorName: ''
};

export default function DecksPage() {
  const router = useRouter();
  const initialSearchQuery = { ...searchQueryDefaults };
  for (const entry of Object.entries(router.query)) {
    const [name, value] = entry;
    if (value) {
      initialSearchQuery[name] =
        typeof searchQueryDefaults[name] !== 'object'
          ? value
          : value.split(',');
    }
  }
  initialSearchQuery.cardIds = initialSearchQuery.cardIds.map(i =>
    parseInt(i, 10)
  );
  initialSearchQuery.isOnlyFactions =
    `${initialSearchQuery.isOnlyFactions}`.toLowerCase() === 'true';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const { error, data, loading } = useQuery(allCardsQuery);

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    const pageParams = new URLSearchParams(searchQuery).toString();
    router.replace(`/decks?${pageParams}`);
  };

  return (
    <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
      <style jsx>{`
        h1 {
          margin: 20px 0 25px 0;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECKS}>Decks</PageBanner>

      {error && <ErrorMessage message={error.message} />}
      {!loading && (
        <DeckSearchForm
          onSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          defaultQuery={{ ...searchQueryDefaults }}
          allCards={data}
        />
      )}
      <h1>Results</h1>
      <SomeDecks search={searchQuery} />
    </Layout>
  );
}
