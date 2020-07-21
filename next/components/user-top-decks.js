import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import DeckPreviewsColumn from './deck-previews-column.js';
import { userTopDecksQuery } from '../lib/deck-queries';

function UserTopDecks({ userId, username, limit }) {
  const { loading, error, data } = useQuery(userTopDecksQuery, {
    variables: { userId, limit }
  });

  const viewMoreUrl = `/decks?updatedTime=100000&authorName=${username}&sortBy=ratingDesc`;

  return (
    <DeckPreviewsColumn
      data={data}
      loading={loading}
      cyData={'userTopDecks'}
      error={error}
      viewMoreUrl={viewMoreUrl}
    />
  );
}

UserTopDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  username: PropTypes.string
};

UserTopDecks.defaultProps = {
  limit: 3
};

export default UserTopDecks;
