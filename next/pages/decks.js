import AllDecks from '../components/all-decks';
import Head from 'next/head';

const index = () => (
  <>
    <Head>
      <title>Mythgard Hub | Decks</title>
      <meta name="description" content="Browse Mythgard decks" />
    </Head>
    <h1>Decks</h1>
    <AllDecks />
  </>
);

export default index;
