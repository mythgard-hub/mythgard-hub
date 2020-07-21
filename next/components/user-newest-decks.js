import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import DeckPreviewsColumn from './deck-previews-column.js';
import { userNewestDecksQuery } from '../lib/deck-queries';

function UserNewestDecks({ userId, username, limit }) {
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
      viewMoreUrl={viewMoreUrl}
    />
  );
}

UserNewestDecks.propTypes = {
  userId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  username: PropTypes.string
};

UserNewestDecks.defaultProps = {
  limit: 3
};

export default UserNewestDecks;
