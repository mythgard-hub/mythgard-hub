import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import CompactDeckList from './compact-deck-list.js';
import { newDeckPreviewsQuery as decksQuery } from '../lib/deck-queries.js';

function NewDecks() {
  const { loading, error, data } = useQuery(decksQuery);

  return (
    <CompactDeckList
      loading={loading}
      error={error}
      data={data}
      cyData="newDecks"
    />
  );
}

export default NewDecks;
