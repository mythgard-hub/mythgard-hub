import React from 'react';
import PropTypes from 'prop-types';
import CardSearch from './card-search.js';
import { handleInputChangeStateless } from '../lib/form-utils.js';
import { Query } from 'react-apollo';
import FactionFilters from '../components/faction-filters';

function DeckBuilderSearchForm({ text, setText, setRarity, onFactionClick }) {
  const onTextChange = handleInputChangeStateless(setText);
  const onRarityChange = handleInputChangeStateless(setRarity);

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
      <div data-cy="cardSearchRarity">
        <label>
          Common
          <input
            type="radio"
            name="rarity"
            value="Common"
            onChange={onRarityChange}
          />
        </label>
        <label>
          Uncommon
          <input
            type="radio"
            name="rarity"
            value="Uncommon"
            onChange={onRarityChange}
          />
        </label>
        <label>
          Rare
          <input
            type="radio"
            name="rarity"
            value="Rare"
            onChange={onRarityChange}
          />
        </label>
        <label>
          Mythic
          <input
            type="radio"
            name="rarity"
            value="Mythic"
            onChange={onRarityChange}
          />
        </label>
      </div>
      <FactionFilters onFactionClick={onFactionClick} />
    </>
  );
}

DeckBuilderSearchForm.propTypes = {
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onFactionClick: PropTypes.func.isRequired
};

export default DeckBuilderSearchForm;
