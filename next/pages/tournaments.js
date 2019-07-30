import React from 'react';
import Layout from '../components/layout';
import AllTournaments from '../components/all-tournaments';

function TournamentsPage() {
  return (
    <Layout
      title="Mythgard Hub | Tournaments"
      desc="Browse Mythgard Tournaments"
    >
      <h1>Tournaments</h1>
      <AllTournaments />
    </Layout>
  );
}

export default TournamentsPage;
