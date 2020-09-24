import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RarityFilter from './rarity-filter.js';
import SupertypeFilter from './supertype-filter.js';
import NumericFilterGroup from './numeric-filter-group.js';
import { ThemeContext } from './theme-context';

export default function CardSearchFilters(props) {
  const theme = useContext(ThemeContext);
  const {
    manaCosts,
    strengths,
    healths,
    types,
    rarities,
    cardset,
    setCardStrengths,
    setCardHealths,
    setCardManaCosts,
    setSupertypes,
    setCardRarities,
    setCardSet
  } = props;

  return (
    <div className="additional-filters">
      <style jsx>{`
        .filter-title {
          text-transform: uppercase;
          font-style: italic;
          font-weight: bold;
          font-size: 1em;
        }
        .middle-title {
          margin-top: 15px;
        }
        .last-title {
          margin-top: 15px;
        }
        .card-set-filter {
          padding-bottom: 20px;
        }

        @media only screen and (max-width: 600px) {
          .additional-filters {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>

      {manaCosts && (
        <>
          <div className="filter-title first-title">Mana Cost</div>
          <hr className="gradient-hr" />
          <NumericFilterGroup
            cyName="cardSearch_manaCost"
            onChange={setCardManaCosts}
            selected={manaCosts}
          />
        </>
      )}

      {strengths && (
        <>
          <div className="filter-title middle-title">Strength</div>
          <hr className="gradient-hr" />
          <NumericFilterGroup
            cyName="cardSearch_strength"
            onChange={setCardStrengths}
            selected={strengths}
          />
        </>
      )}

      {healths && (
        <>
          <div className="filter-title middle-title">Health/Durability</div>
          <hr className="gradient-hr" />
          <NumericFilterGroup
            cyName="cardSearch_defense"
            onChange={setCardHealths}
            selected={healths}
          />
        </>
      )}

      {types && (
        <>
          <div className="filter-title middle-title">Type</div>
          <hr className="gradient-hr" />
          <SupertypeFilter
            cyName="cardSearch_supertype"
            selected={types}
            onChange={setSupertypes}
          />
        </>
      )}

      {rarities && (
        <>
          <div className="filter-title">Rarity</div>
          <hr className="gradient-hr" />
          <RarityFilter
            cyName="cardSearch_rarity"
            selected={rarities}
            onChange={setCardRarities}
          ></RarityFilter>
        </>
      )}

      <>
        <div className="filter-title last-title">Sets</div>
        <hr className="gradient-hr" />
        <div className="card-set-filter">
          <label>
            <input
              type="radio"
              name="cardset"
              value="Core"
              checked={cardset === 'Core'}
              onChange={() => setCardSet('Core')}
            />
            Core
          </label>
          <br />
          <label>
            <input
              type="radio"
              id="Rings of Immortality"
              name="cardset"
              value="Rings of Immortality"
              checked={cardset === 'Rings of Immortality'}
              onChange={() => setCardSet('Rings of Immortality')}
            />
            Rings of Immortality
          </label>
          <br />
          <label>
            <input
              type="radio"
              id="all"
              name="cardset"
              value="all"
              checked={cardset === 'all'}
              onChange={() => setCardSet('all')}
            />
            All sets
          </label>
        </div>
      </>
    </div>
  );
}

CardSearchFilters.propTypes = {
  manaCosts: PropTypes.array,
  strengths: PropTypes.array,
  healths: PropTypes.array,
  types: PropTypes.array,
  rarities: PropTypes.array,
  setCardManaCosts: PropTypes.func,
  setCardStrengths: PropTypes.func,
  setCardHealths: PropTypes.func,
  setSupertypes: PropTypes.func,
  setCardRarities: PropTypes.func
};
