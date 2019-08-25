import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import DeckList from './deck-list';
import {
  getDeckSearchQuery,
  daysAgoToGraphQLTimestamp
} from '../lib/deck-queries';

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
    const variables = this.props.search;
    variables.modifiedOnOrAfter = daysAgoToGraphQLTimestamp(
      variables.updatedTime
    );
    return (
      <Query query={decksSearchQuery} variables={variables}>
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
  search: PropTypes.shape({
    name: PropTypes.string,
    cardIds: PropTypes.array,
    factionNames: PropTypes.array,
    isOnlyFactions: PropTypes.bool,
    updatedTime: PropTypes.string
  }).isRequired
};

export default SomeDecks;
