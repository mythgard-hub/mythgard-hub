import React from 'react';
import { FACTION_IMAGES } from '../constants/factions';
import PropTypes from 'prop-types';

function GemCost({ costString }) {
  return (
    <>
      <style jsx>{`
        img {
          height: 22px;
          margin-right: 5px;
        }
      `}</style>
      {costString
        .toUpperCase()
        .split('')
        .map((f, ix) => {
          let imagePath = '';
          switch (f) {
            case 'B':
              imagePath = FACTION_IMAGES.norden;
              break;
            case 'Y':
              imagePath = FACTION_IMAGES.aztlan;
              break;
            case 'P':
              imagePath = FACTION_IMAGES.harmony;
              break;
            case 'G':
              imagePath = FACTION_IMAGES.dreni;
              break;
            case 'R':
              imagePath = FACTION_IMAGES.oberos;
              break;
            case 'O':
              imagePath = FACTION_IMAGES.parsa;
          }
          return <img key={ix} src={imagePath} alt={f} />;
        })}
    </>
  );
}

GemCost.propTypes = {
  costString: PropTypes.string.isRequired
};

export default GemCost;
