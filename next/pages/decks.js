import React, { useState } from 'react';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';
import PageBanner from '../components/page-banner';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

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
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

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
      <DeckSearchForm
        onSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        defaultQuery={{ ...searchQueryDefaults }}
      />
      <h1>Results</h1>
      <SomeDecks search={searchQuery} />
    </Layout>
  );
}
