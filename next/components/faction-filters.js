import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

import { FACTION_NAMES, FACTION_IMAGES } from '../constants/factions';

const cdn = `${process.env.MG_CDN}/collection-icons/`;

const factions = [...FACTION_NAMES];
const factionImages = Object.values(FACTION_IMAGES);

class FactionFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { factions: [] };

    this.handleFactionClick = this.handleFactionClick.bind(this);
  }

  handleFactionClick(e) {
    const faction = e.currentTarget.getAttribute('data-mgfaction');
    const factions = [...this.state.factions];
    const i = factions.indexOf(faction);
    if (i > -1) {
      factions.splice(i, 1);
    } else {
      factions.push(faction);
    }
    this.setState(
      {
        factions
      },
      () => {
        this.props.onFactionClick(this.state.factions);
      }
    );
  }

  render() {
    const { onIsOnlyFactionClick, isOnlyFactions } = this.props;

    return (
      <div data-cy="factionFilters" className="faction-filters">
        <style jsx>{`
          .faction-filters {
            display: flex;
            padding: 10px 0;
          }
          ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
          }
          ul * + * {
            margin-left: 10px;
            margin-bottom: 10px;
          }
        `}</style>
        <ul>
          {factions.map((f, index) => (
            <li key={f}>
              <FactionFilter
                faction={f}
                selected={this.state.factions.indexOf(f) > -1}
                onFactionClick={this.handleFactionClick}
                factionIcon={factionImages[index]}
              ></FactionFilter>
            </li>
          ))}
        </ul>
        <div>
          <label>
            Only Selected
            <input
              onChange={onIsOnlyFactionClick}
              type="checkbox"
              name="isOnlyFactions"
              value={isOnlyFactions}
              checked={isOnlyFactions}
            />
          </label>
        </div>
      </div>
    );
  }
}

FactionFilters.propTypes = {
  onFactionClick: PropTypes.func.isRequired,
  onIsOnlyFactionClick: PropTypes.func,
  isOnlyFactions: PropTypes.bool
};

export default FactionFilters;
