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
      profileIconId
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
    <Layout>{result}</Layout>
  ) : (
    <>
      <style jsx>{`
        .public-profile {
          text-align: center;
          width: 100%;
          border: 1px solid #458a9e;
          background-color: #1c2d35;
        }
      `}</style>
      <Layout>
        <div className="public-profile">
          <UserProfile user={user} />
        </div>
      </Layout>
    </>
  );
}

PublicAccount.propTypes = {
  username: PropTypes.string
};
