import React, { useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { allDecksQuery } from '../lib/deck-queries';
import PagingControls from './paging-controls.js';
import { scrollToTopOfList } from '../lib/navigation-utils';

const pageSize = 50;

export default function AllDecks() {
  const listRef = React.createRef();
  const dataLoaded = useRef(false);
  const [currentPage, setPage] = useState(0);
  const { loading, error, data } = useQuery(allDecksQuery, {
    variables: {
      first: pageSize,
      offset: currentPage * pageSize
    },
    onCompleted: _ => {
      if (!dataLoaded.current) {
        setTimeout(() => {
          dataLoaded.current = true;
        }, 1000);
      } else {
        scrollToTopOfList(listRef);
      }
    }
  });

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading...</div>;

  if (data && !data.decks) return <div>No decks found</div>;

  const totalCount = data.decks.totalCount;

  return (
    <div ref={listRef}>
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
        itemCount={totalCount}
      ></PagingControls>
    </div>
  );
}
