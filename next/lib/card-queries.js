import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getCardsQuery = () => {
  return gql`
    query cards(
      $searchText: String
      $rarities: [Rarity!]
      $factionIds: [String!]
      $manaCosts: [Int!]
      $manaGTE: Int
    ) {
      cards(
        filter: {
          and: [
            {
              or: [
                { name: { includesInsensitive: $searchText } }
                { rules: { includesInsensitive: $searchText } }
              ]
            }
            {
              or: [
                { mana: { in: $manaCosts } }
                { mana: { greaterThanOrEqualTo: $manaGTE } }
              ]
            }
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

// ['1', '3', '6+'] => [[1,3], 6]
const getManaCostVars = manaCostEnums => {
  if (!(manaCostEnums && manaCostEnums.length)) {
    return [null, null];
  }

  const discreteManaCosts = [];
  let manaGTE;
  manaCostEnums.map(num => {
    if (num.indexOf('+') < 0) {
      return discreteManaCosts.push(parseInt(num, 10));
    } else {
      manaGTE = parseInt(num, 10);
    }
  });
  return [discreteManaCosts, manaGTE];
};

export const executeCardQuery = (factions, text, rarities, manaCostEnums) => {
  const [manaCosts, manaCostGTE] = getManaCostVars(manaCostEnums);
  const query = getCardsQuery();
  return useQuery(query, {
    variables: {
      searchText: text || null,
      factionIds: factions && factions.length ? factions : null,
      rarities: rarities && rarities.length ? rarities : null,
      manaCosts: manaCosts && manaCosts.length ? manaCosts : null,
      manaGTE: manaCostGTE || null
    }
  });
};
