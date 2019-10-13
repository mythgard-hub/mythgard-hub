import React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import { formatDate } from '../lib/graphql-utils.js';
import LargeTable from './large-table.js';
import Link from 'next/link';
import { completedTournaments as tournamentsQuery } from '../lib/tournament-queries.js';
import { dbDateToDisplayDate } from '../lib/time.js';

export default function CompletedTournaments() {
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

        const tourneys = data && data.tournaments && data.tournaments.nodes;
        if (!(tourneys && tourneys.length)) {
          return <div>No completed events found! </div>;
        }

        return (
          <LargeTable>
            <tbody>
              {tourneys.map((tourney, index) => {
                const classNames = index % 2 ? 'zebraRow' : '';
                if (!tourney) {
                  return;
                }
                return (
                  <tr key={index} className={classNames} data-cy="deckListItem">
                    <td data-cy="completedTourneyName">
                      <Link href={`/event?id=${tourney.id}`}>
                        <a className="accent bold">{tourney.name}</a>
                      </Link>
                    </td>
                    <td>{tourney.organizer}</td>
                    <td>{dbDateToDisplayDate(tourney.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </LargeTable>
        );
      }}
    </Query>
  );
}
