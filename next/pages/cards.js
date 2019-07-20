import AllCards from '../components/all-cards';
import Head from 'next/head';

const index = () => (
  <>
    <Head>
      <title>Mythgard Hub | Cards</title>
      <meta name="description" content="Browse and search for Mythgard cards" />
    </Head>
    <h1>Cards</h1>
    <AllCards />
  </>
);

export default index;
