import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { getDeckSearchQuery, getDeckSearchVars } from '../lib/deck-queries';

export default function SomeDecks(props) {
  const { cardIds, factionNames, isOnlyFactions } = props.search;
  const decksSearchQuery = getDeckSearchQuery();

  const variables = getDeckSearchVars({
    ...props.search,
    cardIds,
    factionNames,
    isOnlyFactions
  });

  const { loading, error, data } = useQuery(decksSearchQuery, { variables });

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
