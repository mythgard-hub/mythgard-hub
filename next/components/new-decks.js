import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message.js';

const decksQuery = gql`
  query decks {
    decks(orderBy: CREATED_DESC, first: 3) {
      nodes {
        id
        name
      }
    }
  }
`;

function NewDecks() {
  const { loading, error, data } = useQuery(decksQuery);
  const decks = (data && data.decks && data.decks.nodes) || [];
  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading...</div>;
  return decks.map((deck, i) => {
    return <div key={i}>{deck.name}</div>;
  });
}

export default NewDecks;
