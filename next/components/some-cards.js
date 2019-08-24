import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';
import AllCards from './all-cards';
import {
  getFactionsFilter,
  getTextContainsFilter,
  getCardsQuery
} from '../lib/card-queries.js';

const getFilters = factions => {
  const queryFilters = [];
  if (factions) {
    queryFilters.push(getFactionsFilter(factions));
  }
  queryFilters.push(getTextContainsFilter());
  return queryFilters;
};

const filteredCards = (onCardClick, filters) => {
  const { factions, text } = filters;

  const query = getCardsQuery(getFilters(factions));
  const { loading, error, data } = useQuery(query, {
    variables: {
      searchText: text || null
    }
  });

  if (error) return <ErrorMessage message={error} />;
  if (loading) return null;

  const cards = data && data.cards && data.cards.nodes;

  return <CardList onCardClick={onCardClick} cards={cards} />;
};

export default function SomeCards(props) {
  const { filters, onCardClick } = props;

  if (!filters) {
    return <AllCards onCardClick={onCardClick} />;
  } else {
    return filteredCards(onCardClick, filters);
  }
}

SomeCards.propTypes = {
  onCardClick: PropTypes.func,
  filters: PropTypes.shape({
    factions: PropTypes.array,
    text: PropTypes.string
  })
};
