import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getFactionsFilter = () => {
  return `
    cardFactions: {
      some: {
        faction: {
          name: {
            in: $factionIds
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
    query cards($searchText: String, $rarities: [Rarity!], $factionIds: [String!]){
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

const getFilters = () => {
  const queryFilters = [];
  queryFilters.push(getFactionsFilter());
  queryFilters.push(getTextContainsFilter());
  queryFilters.push(getRarityFilter());
  return queryFilters;
};

export const executeCardQuery = (factions, text, rarities) => {
  const query = getCardsQuery(getFilters());
  return useQuery(query, {
    variables: {
      searchText: text || null,
      factionIds: factions && factions.length ? factions : null,
      rarities: rarities && rarities.length ? rarities : null
    }
  });
};
