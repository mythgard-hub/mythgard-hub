import React from 'react';
import Layout from '../components/layout';
import UpcomingTournaments from '../components/upcoming-tournaments.js';
import CompletedTournaments from '../components/completed-tournaments.js';
import PageBanner from '../components/page-banner';

function TournamentsPage() {
  return (
    <Layout title="Mythgard Hub | Events" desc="Browse Mythgard Events">
      <style jsx>{`
        p {
          font-size: 13px;
        }

        .announcement {
          padding-left: 20px;
          padding-bottom: 10px;
        }

        .announcement .content {
          display: table-cell;
          vertical-align: middle;
          text-align: left;
        }

        h1 {
          margin: 20px 0;
        }

        .announcementCrownLogo {
          float: right;
          margin-right: 50px;
          margin-top: -10px;
          width: 180px;
        }

        @media only screen and (max-width: 600px) {
          .announcement {
            padding-left: 0;
            padding-bottom: 0;
          }

          .announcement img {
            display: none;
          }
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_EVENTS}>Events</PageBanner>
      <div className="announcement">
        <img
          className="announcementCrownLogo"
          src="https://cdn.mythgardhub.com/identity/MGH_CrownLogo.png"
        />

        <div className="content">
          <br />
          <h2>Thank you for your interest in Mythgard Events!</h2>
          <p>
            As <strong>Community</strong> and <strong>Official</strong>{' '}
            competitive scenes and special events develop you will be able to
            find all of the information and results for them right here. If you
            are running a tournament, tournament series, or special
            community-driven event and would like to have the info and results
            on <strong>Mythgard Hub</strong>, please contact us at{' '}
            <a className="accent" href="mailto: Tournaments@mythgardhub.com">
              <strong>Tournaments@mythgardhub.com</strong>
            </a>{' '}
            with the details.
          </p>
        </div>
      </div>
      <div>
        <h1>Upcoming Events</h1>
        <UpcomingTournaments />
        <h1>Completed Events</h1>
        <CompletedTournaments />
      </div>
    </Layout>
  );
}

export default TournamentsPage;
