import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

const factions = ['norden', 'aztlan', 'orboros', 'dreni', 'parsa', 'triusan'];

class FactionFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { factions: [] };

    this.handleFactionClick = this.handleFactionClick.bind(this);
  }

  handleFactionClick(e) {
    const faction = e.target.getAttribute('data-mgfaction');
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
    return (
      <div data-cy="factionFilters">
        <ul>
          {factions.map(f => (
            <li key={f}>
              <FactionFilter
                faction={f}
                onFactionClick={this.handleFactionClick}
              ></FactionFilter>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

FactionFilters.defaultProps = {
  onFactionClick: () => true
};

FactionFilters.propTypes = {
  onFactionClick: PropTypes.func
};

export default FactionFilters;
