import Layout from '../components/layout';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';
import gql from 'graphql-tag';

const query = gql`
  query publicAccount($username: String!) {
    accountByUsername(username: $username) {
      id
      username
      accountType
      registered
    }
  }
`;

export default function PublicAccount({ username }) {
  const { loading, error, data } = useQuery(query, {
    variables: {
      username
    }
  });

  const result = loading ? 'loading' : error ? 'error!' : '';
  const user = data && data.accountByUsername;

  return result ? (
    <Layout>result</Layout>
  ) : (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}

PublicAccount.propTypes = {
  username: PropTypes.string
};
