import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import CardList from './card-list.js';
import PropTypes from 'prop-types';

import allPathsQuery from '../lib/queries/paths-query.js';

export default function AllPaths(props) {
  const { onPathClick } = props;
  const { loading, error, data } = useQuery(allPathsQuery);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading Paths...</div>;
  if (!data || !data.paths) return null;

  const paths = data.paths.nodes.filter(p => p.name !== 'No path selected');
  return (
    <CardList
      onCardClick={onPathClick}
      cards={paths}
      options={{ isLandscape: true, withPaging: false }}
    />
  );
}

AllPaths.propTypes = {
  onPathClick: PropTypes.func
};
