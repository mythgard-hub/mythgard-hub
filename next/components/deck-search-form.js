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
    this.state = { name: '', cardIds: [], factions: [] };

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

  onFactionClick(factions) {
    this.setState({ factions });
  }

  render() {
    return (
      <form>
        <FactionFilters onFactionClick={this.onFactionClick} />
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
