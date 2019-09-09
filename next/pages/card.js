import { withRouter } from 'next/router';
import ErrorMessage from '../components/error-message';
import Card from '../components/card';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import cardQuery from '../lib/queries/card-detail-query';
import { useQuery } from 'react-apollo-hooks';

export default withRouter(({ router }) => {
  const { loading, error, data } = useQuery(cardQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });
  if (loading) return null;
  if (error) return <ErrorMessage message={`Error: ${error}`} />;

  return (
    <Layout
      title={`Mythgard Hub | Cards | ${data.card.name}`}
      desc={`Details and rulings for Mythgard card ${data.card.name}`}
    >
      <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
      <Card card={data.card} />
    </Layout>
  );
});
