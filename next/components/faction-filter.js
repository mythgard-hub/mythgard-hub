import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

class FactionFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { faction, onFactionClick, selected, factionIcon } = this.props;
    let theme = this.context;

    return (
      <div
        data-cy="factionFilter"
        data-mgfaction={faction}
        onClick={onFactionClick}
        className={selected && 'selected'}
      >
        <style jsx>{`
          div {
            padding: 5px;
          }
          img {
            max-height: 40px;
            vertical-align: top;
          }
          border: 1px solid transparent;
          .selected {
            border: ${theme.border};
          }
        `}</style>
        <img src={factionIcon} alt={`${faction}-icon`} />
      </div>
    );
  }
}

FactionFilter.propTypes = {
  onFactionClick: PropTypes.func.isRequired,
  faction: PropTypes.string.isRequired,
  factionIcon: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

FactionFilter.contextType = ThemeContext;

export default FactionFilter;
