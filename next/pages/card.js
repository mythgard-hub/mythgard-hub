import { withRouter } from 'next/router';
import Head from 'next/head';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import cardQuery from '../lib/queries/card-detail-query';
import { useQuery } from 'react-apollo-hooks';
import {
  imagePathMedium as getImagePath,
  mainFaction,
  formatManaCost
} from '../lib/card.js';

const firstLetterUppercase = str => {
  return !str || str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default withRouter(({ router }) => {
  const { loading, error, data } = useQuery(cardQuery, {
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
  if (!data || !data.card)
    return (
      <Layout>
        <ErrorMessage message={'Card does not exist!'} />
      </Layout>
    );

  const title = `${data.card.name} | Mythgard Hub`;
  const description = `${firstLetterUppercase(
    mainFaction(data.card)
  )}, ${formatManaCost(data.card)}${data.card.gem} ${data.card.rarity &&
    firstLetterUppercase(data.card.rarity)} ${data.card.supertype &&
    firstLetterUppercase(data.card.supertype.toString())}, ${data.card
    .subtype && firstLetterUppercase(data.card.subtype)}, Core`;

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
          content={getImagePath(data.card.name, data.card.set)}
        />
        <meta
          key="og:image:type"
          property="og:image:type"
          content="image/png"
        />
      </Head>
      <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
      <Card card={data.card} />
    </Layout>
  );
});
