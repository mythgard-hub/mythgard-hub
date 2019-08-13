import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const getFactionsFilter = factionNames => {
  if (!factionNames.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return 'cardFactions: null,';
  }
  return `
    cardFactions: {
      some: {
        faction: {
          name: {
            in: ["${factionNames.join('","')}"]
          }
        }
      }
    },
  `;
};

const getCardsQuery = filters => {
  return gql`
    query {
      cards(filter: {
        ${filters}
      }){
        nodes {
          name
          id
        }
      }
    }
  `;
};

class SomeCards extends Component {
  constructor(props) {
    super(props);
    this.getCardsQuery = this.getCardsQuery.bind(this);
  }

  getCardsQuery() {
    const {
      filters: { factions }
    } = this.props;
    const queryFilters = [];
    if (factions) {
      queryFilters.push(getFactionsFilter(factions));
    }
    return getCardsQuery(queryFilters);
  }

  render() {
    return (
      <Query query={this.getCardsQuery()}>
        {({ loading, error, data: { cards } }) => {
          if (error) return <ErrorMessage message={error} />;
          if (loading) return <div>Loading</div>;

          return (
            <CardList
              onCardClick={this.props.onCardClick}
              cards={cards.nodes}
            />
          );
        }}
      </Query>
    );
  }
}

SomeCards.propTypes = {
  onCardClick: PropTypes.func,
  filters: PropTypes.shape({
    factions: PropTypes.array
  }).isRequired
};

SomeCards.defaultProps = {
  onCardClick: () => true
};

export default SomeCards;
