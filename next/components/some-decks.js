import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { useDeckSearchQuery } from '../lib/deck-queries';

export default function SomeDecks(props) {
  const {
    authorName,
    name: deckName,
    updatedTime,
    cardIds,
    factionNames,
    isOnlyFactions
  } = props.search;
  const { loading, error, data } = useDeckSearchQuery({
    authorName,
    deckName,
    updatedTime,
    cardIds,
    factionNames,
    isOnlyFactions
  });

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading</div>;

  return <DeckList decks={data.searchDecks.nodes} />;
}

SomeDecks.propTypes = {
  search: PropTypes.shape({
    authorName: PropTypes.string,
    name: PropTypes.string,
    cardIds: PropTypes.array,
    factionNames: PropTypes.array,
    isOnlyFactions: PropTypes.bool,
    updatedTime: PropTypes.string
  }).isRequired
};
