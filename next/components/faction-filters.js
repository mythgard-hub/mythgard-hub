import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

import { FACTION_NAMES, FACTION_IMAGES } from '../constants/factions';
import SliderSwitch from './slider-switch';

class FactionFilters extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFaction = this.toggleFaction.bind(this);
  }

  toggleFaction(faction) {
    const { factions } = this.props;
    const nextFactions = factions.filter(f => f !== faction);
    if (nextFactions.length === factions.length) {
      nextFactions.push(faction);
    }
    this.props.onFactionClick(nextFactions);
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

          @media only screen and (max-width: 600px) {
            .faction-filters {
              flex-direction: column;
            }
          }
        `}</style>
        <ul>
          {FACTION_NAMES.map(f => (
            <li key={f}>
              <FactionFilter
                faction={f}
                selected={this.props.factions.indexOf(f) > -1}
                onFactionClick={() => this.toggleFaction(f)}
                factionIcon={FACTION_IMAGES[f]}
              ></FactionFilter>
            </li>
          ))}
        </ul>
        {isOnlyFactionsSetter && (
          <div className="factions-slider">
            <SliderSwitch
              leftSlider="Has Selected"
              rightSlider="Only Selected"
              checked={isOnlyFactions}
              onChange={onIsOnlyFactionClick}
              onClickLabel={isOnlyFactionsSetter}
            />
          </div>
        )}
      </div>
    );
  }
}

FactionFilters.propTypes = {
  onFactionClick: PropTypes.func.isRequired,
  onIsOnlyFactionClick: PropTypes.func,
  isOnlyFactionsSetter: PropTypes.func,
  isOnlyFactions: PropTypes.bool,
  factions: PropTypes.arrayOf(PropTypes.oneOf(FACTION_NAMES))
};

export default FactionFilters;
