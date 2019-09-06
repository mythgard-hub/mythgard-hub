import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { allDecksQuery } from '../lib/deck-queries';

export default function AllDecks() {
  const { loading, error, data } = useQuery(allDecksQuery);

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading</div>;

  if (data && !data.decks) return <div>No decks found</div>;

  return <DeckList decks={data.decks.nodes} />;
}
