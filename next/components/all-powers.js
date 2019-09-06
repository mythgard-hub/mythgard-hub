import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import PathList from './path-list';
import PropTypes from 'prop-types';

import allPowersQuery from '../lib/queries/all-powers-query';

export default function AllPowers(props) {
  const { onPowerClick } = props;
  const { loading, error, data } = useQuery(allPowersQuery);

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading Powers...</div>;
  if (!data || !data.powers) return null;

  const powers = data.powers.nodes.filter(p => p.name !== 'No power selected');
  return <PathList onPathClick={onPowerClick} paths={powers} />;
}

AllPowers.propTypes = {
  onPowerClick: PropTypes.func
};
