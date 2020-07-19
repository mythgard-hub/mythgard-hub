import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import CompactDeckList from './compact-deck-list.js';
import { userTopDecksQuery } from '../lib/deck-queries';

function UserDecks({ userId, username, limit }) {
  const { loading, error, data } = useQuery(userTopDecksQuery, {
    variables: { userId, limit }
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  const userDeckCount =
    data && data.deckPreviews && data.deckPreviews.totalCount;

  const viewMoreAuthorDecksLink = `/decks?updatedTime=100000&authorName=${username}&sortBy=ratingDesc`;

  return (
    <>
      <style jsx>{`
        .deck-list {
          padding: 0 20px;
          list-style: none;
        }
        .view-more {
          font-size: 0.7em;
          margin-top: -5px;
          margin-right: 20px;
          font-weight: 600;
          text-align: right;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
        }
        .view-more-button {
          cursor: pointer;
        }
        .view-more-button:before {
          text-decoration: none;
          content: '\u25b6';
          font-size: 80%;
          margin-right: 5px;
        }
      `}</style>
      <CompactDeckList
        loading={loading}
        error={error}
        data={data}
        hideDate={true}
        cyData="newestDecks"
      />
      {limit !== -1 && userDeckCount > limit && (
        <div className="view-more">
          <a href={viewMoreAuthorDecksLink}>View More</a>
        </div>
      )}
    </>
  );
}

UserDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  username: PropTypes.string
};

UserDecks.defaultProps = {
  limit: 3
};

export default UserDecks;
