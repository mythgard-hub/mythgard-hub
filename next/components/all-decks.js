import React, { useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { allDecksQuery, daysAgoToGraphQLTimestamp } from '../lib/deck-queries';
import PagingControls from './paging-controls.js';
import { scrollToTopOfElement } from '../lib/ui-utils';
import PropTypes from 'prop-types';

const pageSize = 50;

export default function AllDecks({ defaultDaysAgo }) {
  const listRef = React.createRef();
  const dataLoaded = useRef(false);
  const [currentPage, setPage] = useState(0);
  const { loading, error, data } = useQuery(allDecksQuery, {
    variables: {
      first: pageSize,
      offset: currentPage * pageSize,
      modified: daysAgoToGraphQLTimestamp(defaultDaysAgo)
    },
    onCompleted: () => {
      if (!dataLoaded.current) {
        setTimeout(() => {
          dataLoaded.current = true;
        }, 1000);
      } else {
        scrollToTopOfElement(listRef);
      }
    }
  });

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading...</div>;

  if (data && !data.decks) return <div>No decks found</div>;

  const totalCount = data.decks.totalCount;

  return (
    <div ref={listRef} data-cy="all-decks-loaded">
      <DeckList
        decks={data.decks.nodes}
        currentPage={currentPage}
        setPage={setPage}
      />
      <style jsx>{`
        :global(.mg-paging) {
          margin-top: 20px;
        }
      `}</style>
      <PagingControls
        currentPage={currentPage}
        setPage={setPage}
        pageSize={pageSize}
        listRef={listRef}
        itemCount={totalCount}
      ></PagingControls>
    </div>
  );
}

AllDecks.propTypes = {
  defaultDaysAgo: PropTypes.string.isRequired
};
