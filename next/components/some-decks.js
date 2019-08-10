import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

const decksSearchQuery = gql`
  query decks($name: String!, $cardIds: [Int!]) {
    decks(
      filter: {
        name: { includesInsensitive: $name }
        cardDecks: { some: { cardId: { in: $cardIds } } }
      }
    ) {
      nodes {
        name
        id
      }
    }
  }
`;

class SomeDecks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
