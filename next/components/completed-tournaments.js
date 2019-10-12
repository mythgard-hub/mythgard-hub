import React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import { formatDate } from '../lib/graphql-utils.js';
import LargeTable from './large-table.js';
import Link from 'next/link';
import { completedTournaments as tournamentsQuery } from '../lib/tournament-queries.js';

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
          <LargeTable>
            <tbody>
              {data.tournaments.nodes.map((tourney, index) => {
                const classNames = index % 2 ? 'zebraRow' : '';
                return (
                  <tr key={index} className={classNames} data-cy="deckListItem">
                    <td>
                      <Link href={`/event?id=${tourney.id}`}>
                        <a className="accent bold">{tourney.name}</a>
                      </Link>
                    </td>
                    <td>{tourney.organizer}</td>
                    <td>
                      {new Date(tourney.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
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
