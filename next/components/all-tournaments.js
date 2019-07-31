import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import TournamentList from './tournament-list';

const tournamentsQuery = gql`
  query tournaments {
    tournaments(orderBy: DATE_DESC) {
      nodes {
        id
        name
        date
      }
    }
  }
`;

export default function AllTournaments() {
  return (
    <Query query={tournamentsQuery}>
      {({ loading, error, data: { tournaments } }) => {
        if (error) return <ErrorMessage message="Error loading tournaments." />;
        if (loading) return <div>Loading...</div>;

        return <TournamentList tournaments={tournaments.nodes} />;
      }}
    </Query>
  );
}
