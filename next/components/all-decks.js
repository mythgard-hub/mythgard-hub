import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

export const decksQuery = gql`
  query decks {
    decks {
      nodes {
        id
        name
      }
    }
  }
`;

export default function AllDecks() {
  return (
    <Query query={decksQuery}>
      {({ loading, error, data: { decks } }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        return <DeckList decks={decks.nodes} />;
      }}
    </Query>
  );
}
