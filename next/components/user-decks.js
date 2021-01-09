import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import ErrorMessage from './error-message';
import { userDecksQuery } from '../lib/deck-queries';
import DeckPreviewsColumn from './deck-previews-column';

function UserDecks({ user, limit = -1 }) {
  const { loading, error, data } = useQuery(userDecksQuery, {
    variables: { authorId: user.id }
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  let decks = [];
  try {
    decks = data.decks.nodes.reduce((acc, curr) => {
      acc.push(curr.deckPreviews.nodes[0]);
      return acc;
    }, []);
  } catch (error) {
    console.error('Lily was right and JavaScript is not to be trusted', error);
  }

  return (
    <div>
      <style jsx>{`
        div {
          padding-left: 25px;
        }
      `}</style>
      <DeckPreviewsColumn
        data={{
          deckPreviews: {
            totalCount: decks.length,
            nodes: decks.slice(0, limit)
          }
        }}
        loading={loading}
        cyData={'userDecks'}
        error={error}
        limit={limit}
        viewMoreUrl={`/decks?updatedTime=100000&authorName=${user.username}&sortBy=dateDesc`}
      />
    </div>
  );
}

UserDecks.propTypes = {
  user: PropTypes.object,
  limit: PropTypes.number
};

export default UserDecks;
