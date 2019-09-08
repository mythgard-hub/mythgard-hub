import React from 'react';
import PropTypes from 'prop-types';
import RarityFilter from './rarity-filter.js';
import SupertypeFilter from './supertype-filter.js';
import NumericFilterGroup from './numeric-filter-group.js';

export default function CardSearchFilters(props) {
  const {
    manaCosts,
    strengths,
    healths,
    setCardStrengths,
    setCardHealths,
    setCardManaCosts,
    setSupertypes,
    setCardRarities
  } = props;

  return (
    <div className="additional-filters">
      <style jsx>{`
        .additional-filters {
          margin-left: 35px;
          margin-right: 35px;
          margin-bottom: 35px;
        }
        hr {
          margin-bottom: 10px;
          margin-left: 0;
          width: 95%;
          border: 0;
          height: 1px;
          background-image: linear-gradient(
            to right,
            #4eb8e7,
            #4eb8e7,
            #1c2d35
          );
        }
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
      `}</style>

      {manaCosts && (
        <>
          <div className="filter-title first-title">Mana Cost</div>
          <hr />
          <NumericFilterGroup
            onChange={setCardManaCosts}
            selected={manaCosts}
          />
        </>
      )}

      {strengths && (
        <>
          <div className="filter-title first-title">Strength</div>
          <hr />
          <NumericFilterGroup
            onChange={setCardStrengths}
            selected={strengths}
          />
        </>
      )}

      {healths && (
        <>
          <div className="filter-title first-title">Health/Durability</div>
          <hr />
          <NumericFilterGroup onChange={setCardHealths} selected={healths} />
        </>
      )}

      <div className="filter-title middle-title">Type</div>
      <hr />
      <SupertypeFilter onChange={setSupertypes} />

      <div className="filter-title last-title">Rarity</div>
      <hr />
      <RarityFilter onChange={setCardRarities}></RarityFilter>
    </div>
  );
}

CardSearchFilters.propTypes = {
  manaCosts: PropTypes.array,
  strengths: PropTypes.array,
  healths: PropTypes.array,
  setCardManaCosts: PropTypes.func,
  setCardStrengths: PropTypes.func,
  setCardHealths: PropTypes.func,
  setSupertypes: PropTypes.func,
  setCardRarities: PropTypes.func
};
