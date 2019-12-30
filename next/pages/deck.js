import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../components/error-message';
import Deck from '../components/deck';
import Layout from '../components/layout';
import {
  getAuthor,
  getColors,
  getEssenceCost,
  getDateCreated,
  getDeckType
} from '../lib/deck-utils';
import { singleDeckQuery } from '../lib/deck-queries';
import PageBanner from '../components/page-banner';
import { firstLetterUppercase } from '../lib/string-utils';

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

  const deck = data.deck;
  const authorName = getAuthor(deck);
  const essenceCost = getEssenceCost(deck);
  const dateCreated = getDateCreated(deck);
  const colors = getColors(deck);
  const type = firstLetterUppercase(getDeckType(deck));

  const title = `${data.deck.name} by ${authorName} | Mythgard Hub`;
  const description = `${type} Mythgard Deck, ${colors}, ${essenceCost} Essence, Updated ${dateCreated}`;

  return (
    <Layout title={title} desc={description}>
      <PageBanner image={PageBanner.IMG_DECKS} url="/decks">
        Decks
      </PageBanner>
      <Deck deck={data.deck} />
    </Layout>
  );
});
