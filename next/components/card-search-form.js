import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleInputChange } from '../lib/form-utils.js';
import FactionFilters from './faction-filters.js';

class CardSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e && e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onFactionClick(factionNames) {
    // this.setState({ factionNames });
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.text}
          name="text"
          placeholder="Name or Rules Text"
          maxLength="100"
          data-cy="cardSearchText"
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        <FactionFilters onFactionClick={this.onFactionClick} />
        <input
          data-cy="cardSearchSubmit"
          type="submit"
          value="Search"
          onClick={this.handleSubmit}
        />
      </>
    );
  }
}

CardSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CardSearchForm;
