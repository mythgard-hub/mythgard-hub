import React from 'react';
import FactionFilter from './faction-filter';
import PropTypes from 'prop-types';

const cdn = `${process.env.MG_CDN}/collection-icons/`;

const factions = ['norden', 'aztlan', 'oberos', 'dreni', 'parsa', 'harmony'];
const factionImages = [
  'Filter-Icons_0000s_0003s_0000_blue.png',
  'Filter-Icons_0000s_0003s_0001_yellow.png',
  'Filter-Icons_0000s_0003s_0002_red.png',
  'Filter-Icons_0000s_0003s_0003_green.png',
  'Filter-Icons_0000s_0003s_0004_orange.png',
  'Filter-Icons_0000s_0003s_0005_purple.png'
].map(img => `${cdn}${img}`);

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
    return (
      <div data-cy="factionFilters">
        <style jsx>{`
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
      </div>
    );
  }
}

FactionFilters.propTypes = {
  onFactionClick: PropTypes.func.isRequired
};

export default FactionFilters;
