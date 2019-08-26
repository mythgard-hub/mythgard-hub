import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeStateless } from '../lib/form-utils.js';

const RARITY_ENUM = ['COMMON', 'UNCOMMON', 'RARE', 'MYTHIC'];
const flagsToEnums = flags =>
  flags.reduce((acc, isChecked, i) => {
    if (isChecked) {
      acc.push(RARITY_ENUM[i]);
    }
    return acc;
  }, []);

let previousRarities = [false, false, false, false];

function RarityFilter({ onChange }) {
  const [isCommon, setIsCommon] = useState(false);
  const [isUncommon, setIsUncommon] = useState(false);
  const [isRare, setIsRare] = useState(false);
  const [isMythic, setIsMythic] = useState(false);

  const flags = [isCommon, isUncommon, isRare, isMythic];

  if (previousRarities.join() !== flags.join()) {
    onChange(flagsToEnums(flags));
  }

  previousRarities = [...flags];

  return (
    <div data-cy="cardSearchRarity">
      <label>
        Common
        <input
          type="checkbox"
          name="rarity"
          value="COMMON"
          onChange={handleInputChangeStateless(setIsCommon)}
        />
      </label>
      <label>
        Uncommon
        <input
          type="checkbox"
          name="rarity"
          value="UNCOMMON"
          onChange={handleInputChangeStateless(setIsUncommon)}
        />
      </label>
      <label>
        Rare
        <input
          type="checkbox"
          name="rarity"
          value="RARE"
          onChange={handleInputChangeStateless(setIsRare)}
        />
      </label>
      <label>
        Mythic
        <input
          type="checkbox"
          name="rarity"
          value="MYTHIC"
          onChange={handleInputChangeStateless(setIsMythic)}
        />
      </label>
    </div>
  );
}

RarityFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RarityFilter;
