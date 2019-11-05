import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from './error-message';
import CardList from './card-list.js';
import PropTypes from 'prop-types';

import allPowersQuery from '../lib/queries/powers-query.js';

export default function AllPowers(props) {
  const { onPowerClick } = props;
  const { loading, error, data } = useQuery(allPowersQuery);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <div>Loading Powers...</div>;
  if (!data || !data.powers) return null;

  const powers = data.powers.nodes.filter(p => p.name !== 'No power selected');
  return (
    <CardList
      onCardClick={onPowerClick}
      cards={powers}
      options={{ isLandscape: true, withPaging: false }}
    />
  );
}

AllPowers.propTypes = {
  onPowerClick: PropTypes.func
};
