import { withRouter } from 'next/router';
import React from 'react';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from '../components/error-message';
import LargeTable from '../components/large-table.js';
import FactionsIndicator from '../components/factions-indicator.js';
import EssenceIndicator from '../components/essence-indicator.js';
import { dbDateToDisplayDate } from '../lib/time.js';

const tourneyQuery = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      url
      date
      organizer
      tournamentDecks {
        nodes {
          rank
          deck {
            name
            id
            author {
              username
            }
            deckPreviews {
              nodes {
                deckName
                deckCreated
                factions
                essenceCost
                votes
                deck {
                  id
                  author {
                    username
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function ordinalized(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

export default withRouter(({ router }) => {
  const { error, loading, data } = useQuery(tourneyQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });

  if (error) {
    return <ErrorMessage message={error.message} />;
  } else if (loading) {
    return <div>Loading...</div>;
  }

  const { tournament } = data;
  const tournamentDecks = tournament.tournamentDecks.nodes;
  tournamentDecks.sort((a, b) => {
    return a.rank > b.rank;
  });

  const pageTitle = `Mythgard Hub | Results for ${tournament.name}`;

  return (
    <Layout title={pageTitle} desc="Winners and decklists">
      <style jsx>
        {`
          .nameCell {
            text-align: left;
          }
          h2 {
            margin-bottom: 0;
            margin-top: 20px;
          }
          h3 {
            margin: 0 0 20px;
          }
        `}
      </style>
      <PageBanner image={PageBanner.IMG_EVENTS}>Events</PageBanner>
      <h2>{tournament.name}</h2>
      <h3 className="subtle">{dbDateToDisplayDate(tournament.date)}</h3>
      <h1>Results & Decks</h1>
      <LargeTable>
        <tbody>
          {tournamentDecks.map((tourneyDeck, index) => {
            const { deck } = tourneyDeck;
            const classNames = index % 2 ? 'zebraRow' : '';
            return (
              <tr key={index} className={classNames} data-cy="deckListItem">
                <td>{ordinalized(tourneyDeck.rank)}</td>
                <td className="nameCell">
                  <b>{deck.name}</b> piloted by{' '}
                  <span className="accent">{deck.author.username}</span>
                </td>
                <td>
                  <FactionsIndicator
                    factions={deck.deckPreviews.nodes[0].factions}
                  />
                </td>
                <td>
                  <EssenceIndicator
                    essence={deck.deckPreviews.nodes[0].essenceCost}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </LargeTable>
    </Layout>
  );
});
