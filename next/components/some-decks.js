import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

export const decksSearchQuery = gql`
  query decks($name: String!) {
    searchDecks(title: $name) {
      nodes {
        id
        name
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
        {({ loading, error, data: { searchDecks } }) => {
          if (error) return <ErrorMessage message="Error loading decks." />;
          if (loading) return <div>Loading</div>;

          return <DeckList decks={searchDecks.nodes} />;
        }}
      </Query>
    );
  }
}
SomeDecks.propTypes = {
  search: PropTypes.object.isRequired
};

export default SomeDecks;
