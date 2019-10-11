import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import { formatDate } from '../lib/graphql-utils.js';
import LargeTable from './large-table.js';

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

        return (
          <LargeTable>
            <tbody>
              {data.tournaments.nodes.map((tourney, index) => {
                const classNames = index % 2 ? 'zebraRow' : '';
                return (
                  <tr key={index} className={classNames} data-cy="deckListItem">
                    <td>
                      <a href={tourney.url} className="accent bold">
                        {tourney.name}
                      </a>
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
