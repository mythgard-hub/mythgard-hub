import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import FactionFilters from './faction-filters.js';
import ManaCostFilter from '../components/mana-cost-filter.js';
import SupertypeFilter from '../components/supertype-filter.js';

export default function CardSearchForm(props) {
  const { onSubmit } = props;
  const [text, setText] = useState('');
  const [factions, setFactions] = useState(null);
  const [supertypes, setSupertypes] = useState(null);
  const [manaCosts, setManaCosts] = useState(null);

  const handleSubmit = e => {
    e && e.preventDefault();
    onSubmit({ text, factions, supertypes, manaCosts });
  };

  return (
    <>
      <input
        type="text"
        value={text}
        name="text"
        placeholder="Name or Rules Text"
        maxLength="100"
        data-cy="cardSearchText"
        onChange={handleInputChangeHooks(setText)}
      />
      <SupertypeFilter onChange={setSupertypes} />
      <ManaCostFilter onChange={setManaCosts} />
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
