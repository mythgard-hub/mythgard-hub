import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

const getCardFilters = cardIds => {
  if (!cardIds.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return ['{cardDecks: null}'];
  }
  return cardIds.map(cardId => {
    return `{cardDecks: {some: {cardId: {equalTo: ${cardId}}}}}`;
  });
};

const getFactionFilters = (factionNames, isOnlyFactions) => {
  if (!factionNames.length) {
    // null means ignore this filter.
    // Comma allows chaining.
    return ['{cardDecks: null}'];
  }
  const factionFilters = factionNames.map(factionName => {
    return `{
      cardDecks: {
          some: {
            card: {
              cardFactions: {
                some: {
                  faction: {
                    name: {
                      in: ["${factionName}"]
                    }
                  }
                }
              }
            }
          }
        }
    }`;
  });
  if (isOnlyFactions) {
    factionFilters.push(`{
      cardDecks: {
          every: {
            card: {
              cardFactions: {
                every: {
                  faction: {
                    name: {
                      in: ["${factionNames.join('","')}"]
                    }
                  }
                }
              }
            }
          }
        }
      }`);
  }
  return factionFilters;
};

const getDeckSearchQuery = (cardIds, factionNames, isOnlyFactions = true) => {
  const cardFilters = getCardFilters(cardIds);
  const factionFilters = getFactionFilters(factionNames, isOnlyFactions);
  const allAndQueries = [...cardFilters, ...factionFilters];
  return gql`
    query decks($name: String!) {
      decks(
        filter: {
          name: { includesInsensitive: $name },
          and: [${allAndQueries.join(',')}]
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
    const { cardIds, factionNames } = this.props.search;
    const decksSearchQuery = getDeckSearchQuery(cardIds, factionNames);
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
