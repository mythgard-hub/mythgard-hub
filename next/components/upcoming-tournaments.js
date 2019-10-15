import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import FeaturedTournament from './featured-tournament.js';
import { formatDate } from '../lib/graphql-utils.js';
import { upcomingTournaments as tournamentsQuery } from '../lib/tournament-queries.js';

export default function UpcomingTournaments() {
  const { loading, error, data } = useQuery(tournamentsQuery, {
    variables: {
      now: formatDate(new Date())
    }
  });

  if (error) return <ErrorMessage message="Error loading tournaments." />;
  if (loading) return <div>Loading...</div>;

  const tourneys = data && data.tournaments && data.tournaments.nodes;
  if (!(tourneys && tourneys.length)) {
    return <div>No upcoming events found! </div>;
  }

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
      {tourneys.map((tourney, index) => (
        <li
          key={(tourney && tourney.id) || index}
          data-cy="upcomingTournamentListItem"
        >
          <FeaturedTournament tournament={tourney} />
        </li>
      ))}
    </ul>
  );
}
