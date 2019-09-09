import React, { useState } from 'react';
import AllDecks from '../components/all-decks';
import DeckSearchForm from '../components/deck-search-form';
import SomeDecks from '../components/some-decks';
import PageBanner from '../components/page-banner';
import Layout from '../components/layout';

const hasSearch = function(searchQuery) {
  return (
    searchQuery &&
    (searchQuery.name ||
      searchQuery.cardIds ||
      searchQuery.factionNames ||
      searchQuery.updatedTime ||
      searchQuery.authorName)
  );
};

export default function DecksPage() {
  const [searchQuery, setSearchQuery] = useState({});

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
      <style jsx>{`
        h1 {
          margin: 20px 0 25px 0;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECKS}>Decks</PageBanner>
      <DeckSearchForm onSubmit={handleSearchSubmit} />
      <h1>Results</h1>
      {hasSearch(searchQuery) ? (
        <SomeDecks search={searchQuery} />
      ) : (
        <AllDecks />
      )}
    </Layout>
  );
}
