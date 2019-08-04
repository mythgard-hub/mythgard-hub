import React from 'react';
import PropTypes from 'prop-types';

class FactionFilter extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {value: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div
        data-cy="factionFilter"
        data-mgfaction={this.props.faction}
        onClick={this.props.onFactionClick}
      >
        {this.props.faction}
      </div>
    );
  }
}

FactionFilter.propTypes = {
  onFactionClick: PropTypes.func,
  faction: PropTypes.string
};

export default FactionFilter;
