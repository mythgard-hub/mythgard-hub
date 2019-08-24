import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';

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

export default function SomeCards(props) {
  const { filters, onCardClick } = props;
  const factions = filters && filters.factions;

  const callGetCardsQuery = () => {
    const queryFilters = [];
    if (factions) {
      queryFilters.push(getFactionsFilter(factions));
    }
    return getCardsQuery(queryFilters);
  };

  const { loading, error, data } = useQuery(callGetCardsQuery());

  if (error) return <ErrorMessage message={error} />;
  if (loading) return null;

  const cards = data && data.cards && data.cards.nodes;

  return <CardList onCardClick={onCardClick} cards={cards} />;
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
