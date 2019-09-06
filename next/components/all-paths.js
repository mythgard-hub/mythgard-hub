import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';

import allPathsQuery from '../lib/queries/all-paths-query';

export default function AllPaths(props) {
  const { onCardClick } = props;
  const { loading, error, data } = useQuery(allPathsQuery);

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading Paths...</div>;
  if (!data || !data.paths) return null;

  const paths = data.paths;
  return <CardList onCardClick={onCardClick} cards={paths.nodes} />;
}

AllPaths.propTypes = {
  onCardClick: PropTypes.func
};
