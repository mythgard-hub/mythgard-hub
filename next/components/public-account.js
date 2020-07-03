import Layout from '../components/layout';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import UserProfile from './profile.js';
import UserDecks from '../components/user-decks';
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

  if (result) {
    return <Layout>{result}</Layout>;
  }

  const user = data && data.accountByUsername;

  const viewMoreAuthorDecksLink = `/decks?updatedTime=100000&authorName=${user.username}&sortBy=hot`;

  return (
    <>
      <style jsx>{`
        .public-profile {
          text-align: center;
          width: 100%;
          border: 1px solid #458a9e;
          background-color: #1c2d35;
          padding-bottom: 40px;
        }
      `}</style>
      <Layout>
        <div className="public-profile">
          <UserProfile user={user} />
          <h2>{user.username}&apos;s Decks</h2>
          <UserDecks userId={user.id} limit={3} />
          <div>
            <a href={viewMoreAuthorDecksLink}>View More</a>
          </div>
        </div>
      </Layout>
    </>
  );
}

PublicAccount.propTypes = {
  username: PropTypes.string
};
