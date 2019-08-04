import React from 'react';
import PropTypes from 'prop-types';
import { handleInputChange } from '../lib/form-utils';

class DeckSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e && e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form>
        <label>
          Deck Name:
          <input
            type="text"
            value={this.state.name}
            name="name"
            data-cy="deckSearchDeckName"
            className="name"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <br />
        <input
          data-cy="deckSearchSubmit"
          type="submit"
          value="Search"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func
};

export default DeckSearchForm;
