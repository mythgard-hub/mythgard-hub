import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const cardsQuery = gql`
  query {
    cards {
      nodes {
        name
        id
      }
    }
  }
`;

const factionsToIds = {
  norden: 1,
  aztlan: 2,
  orboros: 3,
  dreni: 4,
  parsa: 5,
  triusan: 6
};

const getFactionsFilter = factionNames => {
  return !factionNames.length
    ? 'cardFactions: null,'
    : `
    cardFactions: {
      some: {
        factionId: {
          in: [${factionNames.map(name => factionsToIds[name]).join(',')}]
        }
      }
    },
    `;
};

const getCardsQuery = factionsFilter => {
  return gql`
  query {
    cards(filter: {
      ${factionsFilter}
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
  static propTypes = {
    onCardClick: PropTypes.func,
    filters: PropTypes.shape({
      factions: PropTypes.array
    }),
    cardsQuery: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.getCardsQuery = this.getCardsQuery.bind(this);
  }

  getCardsQuery() {
    const factionsFilter = getFactionsFilter(this.props.filters.factions);
    return getCardsQuery(factionsFilter);
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

export default SomeCards;
