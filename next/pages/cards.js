import AllCards from '../components/all-cards';
import Layout from '../components/layout';
import PageBanner from '../components/page-banner';

const index = () => (
  <Layout
    title="Mythgard Hub | Cards"
    desc="Browse and search for Mythgard cards"
  >
    <PageBanner image={PageBanner.IMG_CARDS}>Cards</PageBanner>
    <AllCards />
  </Layout>
);

export default index;
