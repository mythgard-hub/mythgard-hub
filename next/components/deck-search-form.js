import React from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import PropTypes from 'prop-types';
import { handleInputChange } from '../lib/form-utils';
import CardSearch from './card-search';
import { cardsQuery } from './all-cards.js';

class DeckSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', cardIds: [] };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCardSearchSelect = this.onCardSearchSelect.bind(this);
  }

  handleSubmit(e) {
    e && e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onCardSearchSelect(card) {
    const cardIds = [...this.state.cardIds, card.id];
    this.setState({
      cardIds
    });
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
        <Query query={cardsQuery}>
          {({ error, data: { cards } }) => {
            if (error) return <ErrorMessage message={error} />;
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
