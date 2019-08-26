import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getCardsQuery = () => {
  return gql`
    query cards(
      $searchText: String
      $rarities: [Rarity!]
      $factionIds: [String!]
    ) {
      cards(
        filter: {
          or: [
            { name: { includesInsensitive: $searchText } }
            { rules: { includesInsensitive: $searchText } }
          ]
          rarity: { in: $rarities }
          cardFactions: { some: { faction: { name: { in: $factionIds } } } }
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

export const executeCardQuery = (factions, text, rarities) => {
  const query = getCardsQuery();
  return useQuery(query, {
    variables: {
      searchText: text || null,
      factionIds: factions && factions.length ? factions : null,
      rarities: rarities && rarities.length ? rarities : null
    }
  });
};
