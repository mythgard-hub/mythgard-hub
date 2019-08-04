import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

const factions = ['norden', 'aztlan', 'orboros', 'dreni', 'parsa', 'triusan'];

class FactionFilters extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {value: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div data-cy="factionFilters">
        <ul>
          {factions.map(f => (
            <li key={f}>
              <FactionFilter
                faction={f}
                onFactionClick={this.props.onFactionClick}
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
