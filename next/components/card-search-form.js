import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardSearch from './card-search.js';
import { Query } from 'react-apollo';
import allCardsQuery from '../lib/queries/all-cards-query';

class CardSearchForm extends Component {
  constructor(props) {
    super(props);
    this.onCardSearchSelect = this.onCardSearchSelect.bind(this);
  }

  onCardSearchSelect(selectedCardIds) {
    this.setState({
      cardIds: selectedCardIds
    });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

CardSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CardSearchForm;
