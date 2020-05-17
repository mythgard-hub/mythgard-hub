import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CompactDeckList from './compact-deck-list.js';
import { newDeckPreviewsQuery as decksQuery } from '../lib/deck-queries.js';

function NewestDecks() {
  const { loading, error, data } = useQuery(decksQuery);

  return (
    <CompactDeckList
      loading={loading}
      error={error}
      data={data}
      cyData="newestDecks"
    />
  );
}

export default NewestDecks;
