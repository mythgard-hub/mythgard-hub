import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
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
import PageBanner from '../components/page-banner';

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
      <PageBanner image={PageBanner.IMG_DECKS}>Decks</PageBanner>
      <Deck deck={data.deck} />
    </Layout>
  );
});
