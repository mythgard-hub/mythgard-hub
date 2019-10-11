import { withRouter } from 'next/router';
import React from 'react';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { tourneyDecksQuery } from '../lib/deck-queries';

export default withRouter(({ router }) => {
  // const { error, data } = useQuery(tourneyDecksQuery, {
  //   variables: { id: tournament.id }
  // });

  return (
    <Layout title="Mythgard Hub | Events" desc="Browse Mythgard Events">
      <style jsx>{``}</style>
      <PageBanner image={PageBanner.IMG_EVENTS}>Events</PageBanner>
      <h1>Results & Decks</h1>
    </Layout>
  );
});
