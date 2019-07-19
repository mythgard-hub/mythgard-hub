import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import SomeDecks from './some-decks';

export const decksQuery = gql`
  query decks {
    decks {
      nodes {
        id
        name
      }
    }
  }
`;

const allDecksJsx = (
  <Query query={decksQuery}>
    {({ loading, error, data: { decks } }) => {
      if (error) return <ErrorMessage message="Error loading decks." />;
      if (loading) return <div>Loading</div>;

      return <DeckList decks={decks.nodes} />;
    }}
  </Query>
);

class AllDecks extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props && this.props.search && this.props.search.name) {
      return <SomeDecks search={this.props.search} />;
    }
    return allDecksJsx;
  }
}

export default AllDecks;
