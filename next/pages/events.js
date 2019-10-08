import React from 'react';
import Layout from '../components/layout';
import AllTournaments from '../components/all-tournaments';
import PageBanner from '../components/page-banner';
import { mgColors } from '../lib/theme';

function TournamentsPage() {
  return (
    <Layout title="Mythgard Hub | Events" desc="Browse Mythgard Events">
      <style jsx>{`
        .announcement {
          padding-left: 20px;
          padding-left: 20px;
          padding-bottom: 10px;
        }

        .announcement announcementText {
          display: table-cell;
          vertical-align: middle;
          text-align: left;
        }

        .announcementCrownLogo {
          float: right;
          margin-right: 50px;
          margin-top: -10px;
          width: 180px;
        }

        a {
          color: ${mgColors.orange};
          text-decoration: none;
        }

        a:hover {
          color: ${mgColors.blue};
        }

        .eventPanel {
          display: table;
          float: left;
          width: 266px;
          height: 90px;
          padding: 10px;
          border-style: solid;
          border-color: ${mgColors.blue};
          border-width: 1px;
          margin-right: 5px;
          background-color: ${mgColors.darkBlue};
        }
        .panelContent.eventName {
          font-weight: 700;
        }

        .panelContent.eventDate {
          font-size: 1em;
          font-weight: 400;
        }

      `}</style>
      <PageBanner image={PageBanner.IMG_EVENTS}>Events</PageBanner>
      <div className="announcement">
        <img
          className="announcementCrownLogo"
          src="https://cdn.mythgardhub.com/identity/MGH_CrownLogo.png"
        />

        // Reformatting to div based on input from Lily
        <div className="announcementText">
          <h2>Thank you for your interest in Mythgard Events!</h2>
          <p>
            As <strong>Community</strong> and <strong>Official</strong>{' '}
            competitive scenes and special events develop you will be able to
            find all of the information and results for them right here. If you
            are running a tournament, tournament series, or special
            community-driven event and would like to have the info and results
            on <strong>Mythgard Hub</strong>, please contact us at{' '}
            <a href="mailto: Tournaments@mythgardhub.com">
              <strong>Tournaments@mythgardhub.com</strong>
            </a>{' '}
            with the details.
          </p>
        </div>
      </div>

      <h1>Upcoming Events</h1>

      // WHY DO I EVEN NEED THIS? - can't get formatting to work without
      <div style="clear: both;">&nbsp;</a></div>

      <div class="eventPanel">
        <content>
          <div class="panelContent eventName">
          <a href="https://teamrankstar.com/98-3-presents-moonlight-masquerade/" target="_blank">Moonlight Masquerade <img style="width: 12px;" src="https://cdn.mythgardhub.com/icons/newWindow.svg"></a></div>
          <div class="panelOrganizer">98.3 Media</div>
          <div class="panelContent eventDate">October 26th -27th, 2019</div>
        </content>
      </div>

      <div class="eventPanel">
        <content>
          <div class="panelContent eventName">
          <a href={`mailto:${process.env.EMAIL_MG_EVENTS}`}>List Your Event Here</a></div>
          <div class="panelOrganizer">YOU</div>
          <div class="panelContent eventDate">Date of your choice</div>
        </content>
      </div>

      <div class="eventPanel">
        <content>
          <div class="panelContent eventName">
          <a href={`mailto:${process.env.EMAIL_MG_EVENTS}`}>List Your Event Here</a></div>
          <div class="panelOrganizer">YOU</div>
          <div class="panelContent eventDate">Date of your choice</div>
        </content>
      </div>

      <h1>Completed Events</h1>

      Event results table to go here, for reference see <a href="https://mythgard-hub.github.io/events_template.html">mockup</a>

    </Layout>
  );
}

export default TournamentsPage;
