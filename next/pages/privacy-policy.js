/**
 * Note our OAuth consent settings reference the URL `/privacy-policy`
 *
 * If you change this page's filename please update our OAuth consent screen
 * settings in the Google Developer's Console.
 */

import Layout from '../components/layout';
import withUser from '../components/with-user';

const index = ({ user }) => (
  <Layout
    title="Mythgard Hub | Privacy Policy"
    desc="The Mythgard Hub privacy policy"
  >
    <h1>Privacy Policy</h1>
    {user && `Privacy Things for ${user.email}`}
  </Layout>
);

export default withUser(index);
