import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import FactionFilters from './faction-filters.js';
import CardSearchFilters from './card-search-filters.js';
import SearchFormText from './search-form-text.js';

export default function CardSearchForm(props) {
  const { onSubmit } = props;
  const [text, setText] = useState('');
  const [factions, setFactions] = useState([]);
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
    <div className="cardSearchForm">
      <style jsx>{`
        .cardSearchForm {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-top;
        }

        .colLeft {
          max-width: 555px;
        }

        .colRight {
          max-width: 328px;
        }
      `}</style>
      <div className="colLeft">
        <SearchFormText
          value={text}
          placeholder={'Name or Rules Text'}
          name="text"
          maxLength="100"
          cyName="cardSearchText"
          onChange={handleInputChangeHooks(setText)}
          label="Card Search"
        />
        <FactionFilters
          factions={factions}
          onFactionClick={newFactions => setFactions(newFactions)}
        />
        <input
          data-cy="cardSearchSubmit"
          type="submit"
          value="Search"
          onClick={handleSubmit}
        />
        {props.children}
      </div>
      <div className="colRight">
        <CardSearchFilters
          manaCosts={manaCosts}
          strengths={strengths}
          healths={defenses}
          rarities={rarities}
          types={supertypes}
          setCardManaCosts={setManaCosts}
          setCardStrengths={setStrengths}
          setCardHealths={setDefenses}
          setCardRarities={setRarities}
          setSupertypes={setSupertypes}
        />
      </div>
    </div>
  );
}

CardSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.object
};
