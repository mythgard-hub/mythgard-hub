import React from 'react';
import PropTypes from 'prop-types';
import RarityFilter from '../components/rarity-filter.js';
import ManaCostFilter from '../components/mana-cost-filter.js';
import SupertypeFilter from '../components/supertype-filter.js';

export default function DeckBuilderAdditionalFilters(props) {
  const { setCardManaCosts, setSupertypes, setCardRarities } = props;

  return (
    <div className="additional-filters">
      <style jsx>{`
        .additional-filters {
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
      <div className="filter-title first-title">Mana Cost</div>
      <hr />
      <ManaCostFilter onChange={setCardManaCosts} />
      <div className="filter-title middle-title">Type</div>
      <hr />
      <SupertypeFilter onChange={setSupertypes} />
      <div className="filter-title last-title">Rarity</div>
      <hr />
      <RarityFilter onChange={setCardRarities}></RarityFilter>
    </div>
  );
}

DeckBuilderAdditionalFilters.propTypes = {
  setCardManaCosts: PropTypes.func,
  setSupertypes: PropTypes.func,
  setCardRarities: PropTypes.func
};
