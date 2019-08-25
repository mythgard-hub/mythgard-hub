import React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import FactionFilters from './faction-filters.js';
import PropTypes from 'prop-types';
import { handleInputChange } from '../lib/form-utils';
import CardSearch from './card-search';
import allCardsQuery from '../lib/queries/all-cards-query';

class DeckSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardIds: [],
      factionNames: [],
      isOnlyFactions: true,
      updatedTime: '150'
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCardSearchSelect = this.onCardSearchSelect.bind(this);
    this.onFactionClick = this.onFactionClick.bind(this);
  }

  handleSubmit(e) {
    e && e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onCardSearchSelect(selectedCardIds) {
    this.setState({
      cardIds: selectedCardIds
    });
  }

  onFactionClick(factionNames) {
    this.setState({ factionNames });
  }

  render() {
    return (
      <form>
        <FactionFilters onFactionClick={this.onFactionClick} />
        <label>
          Only Selected
          <input
            onChange={this.handleInputChange}
            type="checkbox"
            name="isOnlyFactions"
            value={this.state.isOnlyFactions}
            checked={this.state.isOnlyFactions}
          />
        </label>
        <br />
        <br />
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
        <label>
          Updated:
          <select
            data-cy="deckSearchUpdatedTime"
            name="updatedTime"
            value={this.state.updatedTime}
            onChange={this.handleInputChange}
          >
            <option value="100000">Beginning of time</option>
            <option value="15">Last 15 days</option>
            <option value="30">Last 30 days</option>
            <option value="45">Last 45 days</option>
            <option value="60">Last 60 days</option>
            <option value="75">Last 75 days</option>
            <option value="90">Last 90 days</option>
            <option value="150">Last 150 days</option>
          </select>
        </label>
        <br />
        <br />
        <div>Includes cards:</div>
        <Query query={allCardsQuery}>
          {({ loading, error, data: { cards } }) => {
            if (error) return <ErrorMessage message={error} />;
            if (loading) return null;
            return (
              <CardSearch
                cards={cards.nodes}
                onSelect={this.onCardSearchSelect}
              />
            );
          }}
        </Query>
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
