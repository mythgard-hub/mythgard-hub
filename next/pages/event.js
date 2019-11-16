import { withRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../components/error-message';
import LargeTable from '../components/large-table.js';
import FactionsIndicator from '../components/factions-indicator.js';
import EssenceIndicator from '../components/essence-indicator.js';
import { dbDateToDisplayDate } from '../lib/time.js';
import { tournamentWithResultsQuery as tourneyQuery } from '../lib/tournament-queries.js';
import { ordinalized } from '../lib/string-utils';
import Router from 'next/router';

export default withRouter(({ router }) => {
  const { error, loading, data } = useQuery(tourneyQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });

  let pageTitle = 'Mythgard Hub | Event Results';
  let tournamentDecksTable = null;

  if (error) {
    tournamentDecksTable = <ErrorMessage message={error.message} />;
  } else if (loading) {
    tournamentDecksTable = <div>Loading...</div>;
  } else {
    const { tournament } = data;

    if (!tournament) {
      Router.replace('/events');
      return null;
    }

    const tournamentDecks =
      (tournament.tournamentDecks && tournament.tournamentDecks.nodes) || [];

    pageTitle = `Mythgard Hub | Results for ${tournament.name}`;

    tournamentDecksTable =
      !tournamentDecks || !tournamentDecks.length ? (
        'No decks found'
      ) : (
        <React.Fragment>
          <a
            className="external-link accent bold tourneyLink"
            data-cy="tourneyLink"
            href={tournament.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tournament Details
          </a>
          <h2 data-cy="tourneyName">{tournament.name}</h2>
          <h3 className="subtle">{dbDateToDisplayDate(tournament.date)}</h3>
          <h1>Results &amp; Decks</h1>
          <LargeTable>
            <style jsx>{`
              .pilotedBy {
                font-weight: 300;
              }

              .nameCellInner {
                display: inline-block;
                text-align: left;
              }

              tr > td {
                text-align: left;
              }

              tr > td:first-of-type {
                max-width: 25px;
              }
            `}</style>
            <tbody>
              {tournamentDecks
                .sort((a, b) => {
                  return a.rank > b.rank;
                })
                .map((tourneyDeck, index) => {
                  const { deck } = tourneyDeck;
                  const deckPreview = deck.deckPreviews.nodes[0];
                  const classNames = index % 2 ? 'zebraRow' : '';
                  return (
                    <tr
                      key={index}
                      className={classNames}
                      data-cy="deckListItem"
                    >
                      <td>{ordinalized(tourneyDeck.rank)}</td>
                      <td className="nameCell" data-cy="tourneyTop8Name">
                        <span className="nameCellInner">
                          <Link href={`/deck?id=${deck.id}`}>
                            <a data-cy="tourneyDeckLink">
                              <b>{deck.name}</b>
                            </a>
                          </Link>{' '}
                          <br />
                          <span className="pilotedBy">piloted by</span>{' '}
                          <span className="accent">{tourneyDeck.pilot}</span>
                        </span>
                      </td>
                      <td>
                        <FactionsIndicator factions={deckPreview.factions} />
                      </td>
                      <td>
                        <EssenceIndicator essence={deckPreview.essenceCost} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </LargeTable>
        </React.Fragment>
      );
  }

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
          .tourneyLink {
            margin: 10px 0 0;
            float: right;
          }
        `}
      </style>
      <PageBanner image={PageBanner.IMG_EVENTS} url="/events">Events</PageBanner>
      {tournamentDecksTable}
    </Layout>
  );
});
