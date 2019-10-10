import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import TournamentList from './tournament-list';
import { formatDate } from '../lib/graphql-utils.js';

const tournamentsQuery = gql`
  query tournaments($now: Date) {
    tournaments(orderBy: DATE_DESC, filter: { date: { lessThan: $now } }) {
      nodes {
        id
        name
        organizer
        date
        url
      }
    }
  }
`;

export default function AllTournaments() {
  return (
    <Query
      query={tournamentsQuery}
      variables={{
        now: formatDate(new Date())
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading tournaments." />;
        if (loading) return <div>Loading...</div>;

        return <TournamentList tournaments={data.tournaments.nodes} />;
      }}
    </Query>
  );
}
