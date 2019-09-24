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

const initialText = '';
const initialFactions = [];
const initialSuperTypes = [];
const initialManaCosts = [];
const initialStrengths = [];
const initialDefenses = [];
const initialRarities = [];

export default function CardSearchForm(props) {
  const { onSubmit } = props;
  const [text, setText] = useState(initialText);
  const [factions, setFactions] = useState(initialFactions);
  const [supertypes, setSupertypes] = useState(initialSuperTypes);
  const [manaCosts, setManaCosts] = useState(initialManaCosts);
  const [strengths, setStrengths] = useState(initialStrengths);
  const [defenses, setDefenses] = useState(initialDefenses);
  const [rarities, setRarities] = useState(initialRarities);
  const [clearFilters, setClearFilters] = useState(false);
  const [viewFilters, setViewFilters] = useState(widthSupportsTwoColumn());

  useEffect(() => {
    if (clearFilters) {
      handleSubmit();
      setClearFilters(false);
    }
  });

  const handleClearFilters = () => {
    setText(initialText);
    setFactions(initialFactions);
    setSupertypes(initialSuperTypes);
    setManaCosts(initialManaCosts);
    setStrengths(initialStrengths);
    setDefenses(initialDefenses);
    setRarities(initialRarities);
    setClearFilters(true);
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
  children: PropTypes.any
};
