import Layout from '../components/layout';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';
import UserNewestDecks from './user-newest-decks.js';
import UserTopDecks from './user-top-decks.js';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
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
        .accountPageColumns {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 10px 0;
        }

        .mg-column + .mg-column {
          margin-left: ${theme.spacing * 2}px;
        }

        .mg-column {
          flex: 1;
        }

        .accountPageColumns h2 {
          text-align: center;
          font-size: 1.2em;
          font-weight: 700;
          font-style: italic;
          text-transform: uppercase;
        }
        @media only screen and (max-width: 575.98px) {
          .mg-column {
            width: 100%;
            flex: none;
          }

          .mg-column + .mg-column {
            margin-left: 0;
          }
      `}</style>
      <Layout>
        <div className="public-profile">
          <UserProfile user={user} />
          <h2>{user.username}&apos;s Decks</h2>
          <div className="accountPageColumns">
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
          </div>
        </div>
      </Layout>
    </>
  );
}

PublicAccount.propTypes = {
  username: PropTypes.string
};
