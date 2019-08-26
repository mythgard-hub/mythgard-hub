import React from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeStateless } from '../lib/form-utils.js';
import FactionFilters from '../components/faction-filters';
import RarityFilter from '../components/rarity-filter.js';
import ManaCostFilter from '../components/mana-cost-filter.js';

function DeckBuilderSearchForm({
  text,
  setText,
  setRarities,
  onFactionClick,
  setManaCosts
}) {
  const onTextChange = handleInputChangeStateless(setText);

  return (
    <>
      <label htmlFor="text">Card Search</label>
      <input
        type="text"
        value={text}
        name="text"
        placeholder="Name or Rules Text"
        maxLength="100"
        data-cy="cardSearchText"
        onChange={onTextChange}
      />
      <RarityFilter onChange={setRarities}></RarityFilter>
      <ManaCostFilter onChange={setManaCosts} />
      <FactionFilters onFactionClick={onFactionClick} />
    </>
  );
}

DeckBuilderSearchForm.propTypes = {
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onFactionClick: PropTypes.func.isRequired,
  setRarities: PropTypes.func.isRequired,
  setManaCosts: PropTypes.func.isRequired
};

export default DeckBuilderSearchForm;
