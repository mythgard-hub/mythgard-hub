import React from 'react';
import Layout from '../components/layout';
import AllTournaments from '../components/all-tournaments';
import PageBanner from '../components/page-banner';

function TournamentsPage() {
  return (
    <Layout title="Mythgard Hub | Events" desc="Browse Mythgard Events">
      <PageBanner image={PageBanner.IMG_EVENTS}>Tournaments</PageBanner>
      <AllTournaments />
    </Layout>
  );
}

export default TournamentsPage;
