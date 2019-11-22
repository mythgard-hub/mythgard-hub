import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CompactDeckList from './compact-deck-list.js';
import { topDeckPreviewsQuery as decksQuery } from '../lib/deck-queries.js';

function TopDecks() {
  const { loading, error, data } = useQuery(decksQuery);

  return (
    <CompactDeckList
      loading={loading}
      error={error}
      data={data}
      cyData="topDecks"
    />
  );
}

export default TopDecks;
