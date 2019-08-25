import React from 'react';
import PropTypes from 'prop-types';

function RarityFilter({ onChange }) {
  return (
    <div data-cy="cardSearchRarity">
      <label>
        Common
        <input type="radio" name="rarity" value="Common" onChange={onChange} />
      </label>
      <label>
        Uncommon
        <input
          type="radio"
          name="rarity"
          value="Uncommon"
          onChange={onChange}
        />
      </label>
      <label>
        Rare
        <input type="radio" name="rarity" value="Rare" onChange={onChange} />
      </label>
      <label>
        Mythic
        <input type="radio" name="rarity" value="Mythic" onChange={onChange} />
      </label>
    </div>
  );
}

RarityFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RarityFilter;
