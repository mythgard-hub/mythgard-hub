import { withRouter } from 'next/router';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import cardQuery from '../lib/queries/card-detail-query';
import { useQuery } from '@apollo/react-hooks';
import {
  imagePathMedium as getImagePath,
  mainFaction,
  formatManaCost
} from '../lib/card.js';
import { firstLetterUppercase } from '../lib/string-utils';

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
    <Layout
      title={title}
      desc={description}
      image={getImagePath(data.card.name, data.card.set)}
    >
      <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
      <Card card={data.card} />
    </Layout>
  );
});
