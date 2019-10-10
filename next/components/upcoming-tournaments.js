import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import FeaturedTournament from './featured-tournament.js';
import { formatDate } from '../lib/graphql-utils.js';

const tournamentsQuery = gql`
  query tournaments($now: Date) {
    tournaments(
      orderBy: DATE_ASC
      first: 3
      filter: { date: { greaterThanOrEqualTo: $now } }
    ) {
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

        return (
          <ul data-cy="upcomingTournaments" className="upcoming-tournaments">
            <style jsx>{`
              .upcoming-tournaments {
                list-style: none;
                margin: 0;
                padding 0;
                display: flex;
                justify-content: space-between;
              }

              .upcoming-tournaments li {
                flex-grow: 1;
                margin-left: 5px;
              }

              .upcoming-tournaments > li:first-of-type {
                margin-left: 0;
              }

            `}</style>
            {data.tournaments.nodes.map(tourney => (
              <li key={tourney.id} data-cy="upcomingTournamentListItem">
                <FeaturedTournament tournament={tourney} />
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}
