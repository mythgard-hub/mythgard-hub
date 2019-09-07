import PropTypes from 'prop-types';
import { FACTION_IMAGES } from '../constants/factions';

export default function FactionsIndicator({ factions }) {
  if (!(factions && factions.map)) {
    return '';
  }
  return (
    <span className="factionsIndicator">
      <style jsx>{`
        img {
          max-height: 15px;
          margin-right: 5px;
        }
      `}</style>
      {factions.map(f => (
        <img key={f} src={FACTION_IMAGES[f]} />
      ))}
    </span>
  );
}

FactionsIndicator.propTypes = {
  factions: PropTypes.arrayOf(PropTypes.string)
};
