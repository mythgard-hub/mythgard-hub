import Layout from '../components/layout';
import PageBanner from '../components/page-banner';

const index = () => {
  return (
    <Layout>
      <PageBanner image={PageBanner.IMG_PATCH_NOTES}>Patch Notes</PageBanner>
      Patch Notes shall go here.
    </Layout>
  );
};

export default index;
