import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

import { FACTION_NAMES, FACTION_IMAGES } from '../constants/factions';
import SliderSwitch from './slider-switch';

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
    const {
      onIsOnlyFactionClick,
      isOnlyFactions,
      isOnlyFactionsSetter
    } = this.props;

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
          .factions-slider {
            margin-left: 20px;
            padding-top: 10px;
          }
        `}</style>
        <ul>
          {FACTION_NAMES.map((f, index) => (
            <li key={f}>
              <FactionFilter
                faction={f}
                selected={this.state.factions.indexOf(f) > -1}
                onFactionClick={this.handleFactionClick}
                factionIcon={FACTION_IMAGES[f]}
              ></FactionFilter>
            </li>
          ))}
        </ul>
        <div className="factions-slider">
          {isOnlyFactions && (
            <SliderSwitch
              leftLabel="Has Selected"
              rightLabel="Only Selected"
              checked={isOnlyFactions}
              onChange={onIsOnlyFactionClick}
              onClickLabel={isOnlyFactionsSetter}
            />
          )}
        </div>
      </div>
    );
  }
}

FactionFilters.propTypes = {
  onFactionClick: PropTypes.func.isRequired,
  onIsOnlyFactionClick: PropTypes.func,
  isOnlyFactionsSetter: PropTypes.func,
  isOnlyFactions: PropTypes.bool
};

export default FactionFilters;
