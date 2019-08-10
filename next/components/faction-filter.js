import React from 'react';
import PropTypes from 'prop-types';

class FactionFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        data-cy="factionFilter"
        data-mgfaction={this.props.faction}
        onClick={this.props.onFactionClick}
        className={this.props.selected && 'selected'}
      >
        <style jsx>{`
          div {
            padding: 5px;
          }
          img {
            max-height: 50px;
            vertical-align: top;
          }
          border: 1px solid transparent;
          .selected {
            border: 1px solid black;
          }
        `}</style>
        <img src={this.props.factionIcon} alt={`${this.props.faction}-icon`} />
      </div>
    );
  }
}

FactionFilter.propTypes = {
  onFactionClick: PropTypes.func,
  faction: PropTypes.string,
  factionIcon: PropTypes.string,
  selected: PropTypes.bool
};

export default FactionFilter;
