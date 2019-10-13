import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { useDeckSearchQuery } from '../lib/deck-queries';
import { useState } from 'react';
import PagingControls from './paging-controls.js';
import { scrollToTopOfElement } from '../lib/ui-utils';

const pageSize = 50;

export default function SomeDecks(props) {
  const [currentPage, setPage] = useState(0);
  const {
    authorName,
    name: deckName,
    updatedTime,
    cardIds,
    factionNames,
    isOnlyFactions
  } = props.search;
  const { loading, error, data } = useDeckSearchQuery(
    {
      authorName,
      deckName,
      updatedTime,
      cardIds,
      factionNames,
      isOnlyFactions,
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
    <div ref={listRef}>
      <DeckList decks={data.searchDecks.nodes} />

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
    updatedTime: PropTypes.string
  }).isRequired
};
