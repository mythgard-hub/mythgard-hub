import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

const getCardsFilter = cardIds => {
  if (!cardIds.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return 'cardDecks: null,';
  }
  const cardIdFilters = cardIds.map(cardId => {
    return `{cardDecks: {some: {cardId: {equalTo: ${cardId}}}}}`;
  });
  return `
    and: [${cardIdFilters.join(',')}]
  `;
};

const getDeckSearchQuery = cardIds => {
  const cardsFilter = getCardsFilter(cardIds);
  return gql`
    query decks($name: String!) {
      decks(
        filter: {
          name: { includesInsensitive: $name },
          ${cardsFilter}
        }
      ) {
        nodes {
          name
          id
        }
      }
    }
  `;
};

class SomeDecks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const decksSearchQuery = getDeckSearchQuery(this.props.search.cardIds);
    return (
      <Query query={decksSearchQuery} variables={this.props.search}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading decks." />;
          if (loading) return <div>Loading</div>;

          return <DeckList decks={data.decks.nodes} />;
        }}
      </Query>
    );
  }
}
SomeDecks.propTypes = {
  search: PropTypes.object.isRequired
};

export default SomeDecks;
