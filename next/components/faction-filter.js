import React from 'react';
import PropTypes from 'prop-types';

const cdn = 'https://mythgardhub.s3-us-west-2.amazonaws.com/collection-icons/';

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
        <img src={`${cdn}${this.props.factionIcon}`} alt="" />
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
