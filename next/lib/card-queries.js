import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getFactionsFilter = factionNames => {
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
    }
  `;
};

export const getTextContainsFilter = () => {
  return `
    or: [{
      name: {
        includesInsensitive: $searchText
      }
    },{
      rules: {
        includesInsensitive: $searchText
      }
    }]
  `;
};

export const getRarityFilter = () => {
  return `
    rarity: {
      in: $rarities
    }
  `;
};

export const getCardsQuery = filters => {
  return gql`
    query cards($searchText: String, $rarities: [Rarity!]){
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

const getFilters = factions => {
  const queryFilters = [];
  if (factions) {
    queryFilters.push(getFactionsFilter(factions));
  }
  queryFilters.push(getTextContainsFilter());
  queryFilters.push(getRarityFilter());
  return queryFilters;
};

export const executeCardQuery = (factions, text, rarities) => {
  const query = getCardsQuery(getFilters(factions));
  return useQuery(query, {
    variables: {
      searchText: text || null,
      rarities: rarities || null
    }
  });
};
