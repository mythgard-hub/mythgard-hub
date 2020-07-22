import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import CompactDeckList from './compact-deck-list.js';
import ViewMore from './view-more.js';

function DeckPreviewsColumn({
  loading,
  error,
  data,
  viewMoreUrl,
  cyData,
  limit = 3
}) {
  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading...</div>;

  const deckCount = data && data.deckPreviews && data.deckPreviews.totalCount;

  return (
    <>
      <CompactDeckList
        loading={loading}
        error={error}
        data={data}
        hideDate={true}
        cyData={cyData}
      />
      <ViewMore limit={limit} count={deckCount} url={viewMoreUrl} />
    </>
  );
}

DeckPreviewsColumn.propTypes = {
  data: PropTypes.shape({
    deckPreviews: PropTypes.object
  }),
  viewMoreUrl: PropTypes.string,
  cyData: PropTypes.string,
  limit: PropTypes.number,
  error: PropTypes.any,
  loading: PropTypes.any
};

export default DeckPreviewsColumn;
