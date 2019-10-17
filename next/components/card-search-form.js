import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import FactionFilters from './faction-filters.js';
import CardSearchFilters from './card-search-filters.js';
import SearchFormText from './search-form-text.js';
import SliderSwitch from './slider-switch';

const widthSupportsTwoColumn = () => {
  if (!process.browser) {
    return true;
  }
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return w >= 925;
};

export default function CardSearchForm(props) {
  const { onSubmit, searchQuery } = props;
  const [text, setText] = useState(searchQuery.text);
  const [factions, setFactions] = useState(searchQuery.factions);
  const [supertypes, setSupertypes] = useState(searchQuery.supertypes);
  const [manaCosts, setManaCosts] = useState(searchQuery.manaCosts);
  const [strengths, setStrengths] = useState(searchQuery.strengths);
  const [defenses, setDefenses] = useState(searchQuery.defenses);
  const [rarities, setRarities] = useState(searchQuery.rarities);
  const [clearFilters, setClearFilters] = useState(false);
  const [viewFilters, setViewFilters] = useState(widthSupportsTwoColumn());

  useEffect(() => {
    if (clearFilters) {
      handleSubmit();
      setClearFilters(false);
    }
  });

  const handleClearFilters = () => {
    props.onClearFilters();
  };

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
          justify-content: space-between;
        }

        :global(.searchFormText input) {
          width: 380px;
        }

        .colLeft,
        .colRight {
          padding-top: 30px;
        }

        .colLeft {
          max-width: 535px;
          flex-grow: 1;
        }

        .colLeftUpper {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-right: 15px;
        }

        .colLeftUpperRight {
          display: flex;
          flex-direction: column;
        }

        .colLeftUpperRight > * {
          min-width: 100px;
          padding: 0;
          font-size: 11px;
          line-height: 35px;
        }

        .clearButton {
          margin-top: 10px;
        }
      `}</style>
      <div className="colLeft">
        <div className="colLeftUpper">
          <div className="colLeftUpperLeft">
            <SearchFormText
              value={text}
              placeholder={'Name, Subtype, or Rules Text'}
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
          </div>
          <div className="colLeftUpperRight">
            <input
              data-cy="cardSearchSubmit"
              type="submit"
              value="Apply"
              onClick={handleSubmit}
            />
            <button
              data-cy="cardSearchClear"
              className="clearButton"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
        </div>
        {props.children}
      </div>
      <div className="colRight">
        <span className={!viewFilters || 'hideOnNotTablet'}>
          <SliderSwitch
            rightSlider="View More Filters"
            checked={viewFilters}
            onChange={() => {
              setViewFilters(prev => !prev);
            }}
            onClickLabel={setViewFilters}
          />
        </span>
        {viewFilters && (
          <>
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
            <span className="hideOnNotTablet">
              <SliderSwitch
                rightSlider="View Filters"
                checked={viewFilters}
                onChange={() => {
                  setViewFilters(prev => !prev);
                }}
                onClickLabel={setViewFilters}
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

CardSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  searchQuery: PropTypes.shape({
    text: PropTypes.string,
    factions: PropTypes.array,
    supertypes: PropTypes.array,
    manaCosts: PropTypes.array,
    strengths: PropTypes.array,
    defenses: PropTypes.array,
    rarities: PropTypes.array
  }).isRequired,
  children: PropTypes.any
};
