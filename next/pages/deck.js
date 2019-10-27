import { withRouter } from 'next/router';
import Head from 'next/head';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from '../components/error-message';
import Deck from '../components/deck';
import Layout from '../components/layout';
import { singleDeckQuery } from '../lib/deck-queries';

export default withRouter(({ router }) => {
  const { error, loading, data } = useQuery(singleDeckQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.deck)
    return <ErrorMessage message={'Deck does not exist!'} />;

  const authorName =
    (data.deck.author && data.deck.author.username) || 'unknown';
  const metaData =
    data.deck.deckPreviews &&
    data.deck.deckPreviews.nodes &&
    data.deck.deckPreviews.nodes[0];
  const essenceCost = metaData && metaData.essenceCost;
  const dateCreated =
    metaData &&
    metaData.deckCreated &&
    new Date(metaData.deckCreated).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const factions = metaData && metaData.factions;
  const colors = factions
    .map(faction =>
      faction
        .replace('norden', 'B')
        .replace('aztlan', 'Y')
        .replace('oberos', 'R')
        .replace('dreni', 'G')
        .replace('parsa', 'O')
        .replace('harmony', 'P')
    )
    .join('');

  return (
    <Layout
      title={`Mythgard Hub | Decks | ${data.deck.name}`}
      desc={`Details for Mythgard deck ${data.deck.name}`}
    >
      <Head>
        <meta
          key="og:title"
          property="og:title"
          content={`${data.deck.name} by ${authorName} | Mythgard Hub`}
        />
        <meta
          key="og:site_name"
          property="og:site_name"
          content="Mythgard Hub"
        />
        <meta
          key="og:description"
          property="og:description"
          content={`Standard Mythgard Deck, ${colors}, ${essenceCost} Essence, Updated ${dateCreated}`}
        />
        <meta
          key="og:url"
          property="og:url"
          content={`https://mythgardhub.com${router.asPath}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:image"
          property="og:image"
          content="https://cdn.mythgardhub.com/identity/og-image.jpg"
        />
        <meta
          key="og:image:type"
          property="og:image:type"
          content="image/png"
        />
      </Head>
      <Deck deck={data.deck} />
    </Layout>
  );
});
