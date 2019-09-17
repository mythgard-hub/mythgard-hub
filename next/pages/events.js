import React from 'react';
import Layout from '../components/layout';
import AllTournaments from '../components/all-tournaments';
import PageBanner from '../components/page-banner';

function TournamentsPage() {
  return (
    <Layout title="Mythgard Hub | Events" desc="Browse Mythgard Events">
      <PageBanner image={PageBanner.IMG_EVENTS}>Events</PageBanner>
      <p>Thank you for your interest in Mythgard Events!</p>
      <p>
        As Community and Official competitive scenes and special events develop
        you will be able to find all of the information and results for them
        right here.
      </p>
      <p>
        If you are running a tournament, tournament series, or special community
        driven event and would like to have the info and results on Mythgard
        Hub, please contact us at{' '}
        <a href="mailto:Tournaments@mythgardhub.com">
          Tournaments@mythgardhub.com
        </a>{' '}
        with the details.
      </p>
    </Layout>
  );
}

export default TournamentsPage;
