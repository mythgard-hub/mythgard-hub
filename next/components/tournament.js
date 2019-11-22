import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { tourneyDecksQuery } from '../lib/deck-queries';

Tournament.propTypes = {
  tournament: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default function Tournament({ tournament }) {
  const { error, data } = useQuery(tourneyDecksQuery, {
    variables: { id: tournament.id }
  });

  let deckElement = <div>Loading Decks...</div>;

  if (error) deckElement = <ErrorMessage message="Error loading decks" />;

  if (data) {
    const decks = data.tournament.tournamentDecks.nodes.map(({ deck }) => deck);
    deckElement = <DeckList decks={decks} />;
  }

  return (
    <>
      <h1>{tournament.name}</h1>
      <h2>Decks</h2>
      {deckElement}
    </>
  );
}
