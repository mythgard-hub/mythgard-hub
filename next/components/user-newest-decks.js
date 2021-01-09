import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import DeckPreviewsColumn from './deck-previews-column.js';
import { userNewestDecksQuery } from '../lib/deck-queries';

function UserNewestDecks({ userId, username, limit = 3 }) {
  const { loading, error, data } = useQuery(userNewestDecksQuery, {
    variables: { userId, limit }
  });

  const viewMoreUrl = `/decks?updatedTime=100000&authorName=${username}&sortBy=dateDesc`;

  return (
    <DeckPreviewsColumn
      data={data}
      loading={loading}
      cyData={'userNewestDecks'}
      error={error}
      limit={limit}
      viewMoreUrl={viewMoreUrl}
    />
  );
}

UserNewestDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  username: PropTypes.string
};

export default UserNewestDecks;
