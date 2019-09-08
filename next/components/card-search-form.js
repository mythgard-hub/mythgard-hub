import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import FactionFilters from './faction-filters.js';
import RarityFilter from '../components/rarity-filter.js';
import SupertypeFilter from '../components/supertype-filter.js';
import CardSearchFilters from './card-search-filters.js';
import SearchFormText from './search-form-text.js';

export default function CardSearchForm(props) {
  const { onSubmit } = props;
  const [text, setText] = useState('');
  const [factions, setFactions] = useState(null);
  const [supertypes, setSupertypes] = useState([]);
  const [manaCosts, setManaCosts] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [defenses, setDefenses] = useState([]);
  const [rarities, setRarities] = useState([]);

  const handleSubmit = e => {
    e && e.preventDefault();
    onSubmit({
      text,
      factions,
      supertypes,
      manaCosts,
      strengths,
      defenses,
      rarities
    });
  };

  return (
    <>
      <SearchFormText
        value={text}
        placeholder={'Name or Rules Text'}
        name="text"
        maxLength="100"
        cyName="cardSearchText"
        onChange={handleInputChangeHooks(setText)}
        label="Card Search"
      />
      <CardSearchFilters
        manaCosts={manaCosts}
        strengths={strengths}
        healths={defenses}
        setCardManaCosts={setManaCosts}
        setCardStrengths={setStrengths}
        setCardHealths={setDefenses}
      />
      <SupertypeFilter onChange={setSupertypes} />
      <RarityFilter onChange={setRarities}></RarityFilter>
      <br />
      <br />
      <FactionFilters
        onFactionClick={newFactions => setFactions(newFactions)}
      />
      <input
        data-cy="cardSearchSubmit"
        type="submit"
        value="Search"
        onClick={handleSubmit}
      />
    </>
  );
}

CardSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
