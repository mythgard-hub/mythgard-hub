import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { useDeckSearchQuery } from '../lib/deck-queries';
import { useState } from 'react';
import PagingControls from './paging-controls.js';
import { scrollToTopOfElement } from '../lib/ui-utils';
import { ARCHETYPES, TYPES } from '../constants/deck';

const pageSize = 50;

const findValueFromLabel = (optionsArray, label) => {
  try {
    return optionsArray.find(o => o.label === label).value;
  } catch (e) {
    return null;
  }
};

const serializeDeckSearchResults = decks => {
  return decks.map(deck => {
    const username = deck.author && deck.author.username;
    const deckPreview =
      deck &&
      deck.deckPreviews &&
      deck.deckPreviews.nodes &&
      deck.deckPreviews.nodes.length &&
      deck.deckPreviews.nodes[0];
    const deckCreated = deckPreview && deckPreview.deckCreated;
    const factions = deckPreview && deckPreview.factions;
    const essenceCost = deckPreview && deckPreview.essenceCost;
    const votes = deckPreview && deckPreview.votes;
    const deckArchetype = deckPreview && deckPreview.deckArchetype;
    const deckType = deckPreview && deckPreview.deckType;

    return {
      deckId: deck.id,
      deckName: deck.name,
      username,
      deckModified: deck.modified,
      deckCreated,
      factions,
      essenceCost,
      votes,
      deckArchetype,
      deckType
    };
  });
};

export default function SomeDecks(props) {
  const [currentPage, setPage] = useState(0);
  const {
    authorName,
    name: deckName,
    updatedTime,
    cardIds,
    factionNames,
    isOnlyFactions,
    archetype,
    type,
    sortBy
  } = props.search;
  const archetypeValue = findValueFromLabel(ARCHETYPES, archetype);
  const typeValue = findValueFromLabel(TYPES, type);
  const { loading, error, data } = useDeckSearchQuery(
    {
      authorName,
      deckName,
      updatedTime,
      cardIds,
      factionNames,
      isOnlyFactions,
      archetype: archetypeValue,
      type: typeValue,
      sortBy,
      first: pageSize,
      offset: currentPage * pageSize
    },
    () => scrollToTopOfElement(listRef)
  );

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading...</div>;

  if (data && !data.searchDecks) return <div>No decks found</div>;

  const totalCount = data.searchDecks.totalCount;
  const listRef = React.createRef();

  return (
    <div ref={listRef} data-cy-decksort={sortBy}>
      <DeckList decks={serializeDeckSearchResults(data.searchDecks.nodes)} />

      <style jsx>{`
        :global(.mg-paging) {
          margin-top: 20px;
        }
      `}</style>
      <PagingControls
        currentPage={currentPage}
        setPage={setPage}
        pageSize={pageSize}
        itemCount={totalCount}
      ></PagingControls>
    </div>
  );
}

SomeDecks.propTypes = {
  search: PropTypes.shape({
    authorName: PropTypes.string,
    name: PropTypes.string,
    cardIds: PropTypes.array,
    factionNames: PropTypes.array,
    isOnlyFactions: PropTypes.bool,
    updatedTime: PropTypes.string,
    sortBy: PropTypes.string,
    archetype: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};
