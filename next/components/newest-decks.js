import React from 'react';
import { useQuery } from '@apollo/client';
import CompactDeckList from './compact-deck-list.js';
import { newDeckPreviewsQuery as decksQuery } from '../lib/deck-queries.js';

function NewestDecks() {
  const { loading, error, data } = useQuery(decksQuery);

  return (
    <CompactDeckList
      loading={loading}
      error={error}
      data={data}
      hideDate={true}
      cyData="newestDecks"
    />
  );
}

export default NewestDecks;
