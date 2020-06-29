import Layout from '../components/layout';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';

export default function PublicAccount({ id }) {
  const user = { username: '' + id };
  return (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}

PublicAccount.propTypes = {
  id: PropTypes.number
};
