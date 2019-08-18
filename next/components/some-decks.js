import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import { getDeckSearchQuery } from '../lib/deck-queries';

class SomeDecks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cardIds, factionNames, isOnlyFactions } = this.props.search;
    const decksSearchQuery = getDeckSearchQuery(
      cardIds,
      factionNames,
      isOnlyFactions
    );
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
