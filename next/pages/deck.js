import { withRouter } from 'next/router';
import Head from 'next/head';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from '../components/error-message';
import Deck from '../components/deck';
import Layout from '../components/layout';
import {
  getAuthor,
  getColors,
  getEssenceCost,
  getDateCreated
} from '../lib/deck-utils';
import { singleDeckQuery } from '../lib/deck-queries';

export default withRouter(({ router }) => {
  const { error, loading, data } = useQuery(singleDeckQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <ErrorMessage message={error.message} />
      </Layout>
    );
  if (!data || !data.deck)
    return (
      <Layout>
        <ErrorMessage message={'Deck does not exist!'} />
      </Layout>
    );

  const authorName = getAuthor(data.deck);
  const essenceCost = getEssenceCost(data.deck);
  const dateCreated = getDateCreated(data.deck);
  const colors = getColors(data.deck);

  const title = `${data.deck.name} by ${authorName} | Mythgard Hub`;
  const description = `Standard Mythgard Deck, ${colors}, ${essenceCost} Essence, Updated ${dateCreated}`;

  return (
    <Layout title={title} desc={description}>
      <Head>
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:site_name"
          property="og:site_name"
          content="Mythgard Hub"
        />
        <meta
          key="og:description"
          property="og:description"
          content={description}
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
