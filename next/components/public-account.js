import Layout from '../components/layout';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';

// query publicAccount($username:String!) {
//   accountByUsername(username: $username) {
//     id,
//     username,
//     accountType,
//     registered
//   }
// }

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
