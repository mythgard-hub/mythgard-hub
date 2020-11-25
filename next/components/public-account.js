import Layout from '../components/layout';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';
import UserNewestDecks from './user-newest-decks.js';
import UserTopDecks from './user-top-decks.js';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import MultiColumn from './multi-column.js';
import gql from 'graphql-tag';

export const query = gql`
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
  const theme = useContext(ThemeContext);
  const { loading, error, data } = useQuery(query, {
    variables: {
      username
    }
  });

  const result = loading ? 'loading' : error ? 'error!' : '';

  if (result) {
    return <Layout>{result}</Layout>;
  }

  let user;
  try {
    user = data && data.accountByUsername;
  } catch (e) {
    return <Layout>No profile found for user: {username}</Layout>;
  }

  return (
    <>
      <style jsx>{`
        .public-profile {
          padding: 20px;
          text-align: center;
          width: 100%;
          border: ${theme.sectionBorder};
          background-color: #1c2d35;
          padding-bottom: 40px;
        }
      `}</style>
      <Layout>
        <div className="public-profile" data-cy="publicProfileWrapper">
          <UserProfile user={user} />
          <h2>{user.username}&apos;s Decks</h2>

          <MultiColumn>
            <div className="mg-column">
              <h2>Top Decks</h2>
              <hr className="orangeGrade" />
              <UserTopDecks userId={user.id} username={user.username} />
            </div>
            <div className="mg-column">
              <h2>Newest Decks</h2>
              <hr className="orangeGrade" />
              <UserNewestDecks userId={user.id} username={user.username} />
            </div>
          </MultiColumn>
        </div>
      </Layout>
    </>
  );
}

PublicAccount.propTypes = {
  username: PropTypes.string
};
