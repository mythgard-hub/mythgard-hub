import React from 'react';
import PropTypes from 'prop-types';

function RarityFilter({ onChange }) {
  return (
    <div data-cy="cardSearchRarity">
      <label>
        Common
        <input type="radio" name="rarity" value="COMMON" onChange={onChange} />
      </label>
      <label>
        Uncommon
        <input
          type="radio"
          name="rarity"
          value="UNCOMMON"
          onChange={onChange}
        />
      </label>
      <label>
        Rare
        <input type="radio" name="rarity" value="RARE" onChange={onChange} />
      </label>
      <label>
        Mythic
        <input type="radio" name="rarity" value="MYTHIC" onChange={onChange} />
      </label>
    </div>
  );
}

RarityFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RarityFilter;
