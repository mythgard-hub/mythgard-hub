import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getCardsQuery = () => {
  return gql`
    query cards(
      $searchText: String
      $rarities: [Rarity!]
      $factionIds: [String!]
      $manaCosts: [Int!]
      $strengths: [Int!]
      $defenses: [Int!]
      $supertypes: [Cardtype]
      $manaGTE: Int
      $strengthGTE: Int
      $defenseGTE: Int
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
            {
              or: [
                { atk: { in: $strengths } }
                { atk: { greaterThanOrEqualTo: $strengthGTE } }
              ]
            }
            {
              or: [
                { atk: { in: $defenses } }
                { atk: { greaterThanOrEqualTo: $defenseGTE } }
              ]
            }
          ]
          rarity: { in: $rarities }
          supertype: { containedBy: $supertypes }
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
export const getManaCostVars = manaCostEnums => {
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

export const executeCardQuery = (
  factions,
  text,
  rarities,
  manaCostEnums,
  supertypes,
  strengthEnums,
  defenseEnums
) => {
  const [manaCosts, manaCostGTE] = getManaCostVars(manaCostEnums);
  const [strengths, strengthGTE] = getManaCostVars(strengthEnums);
  const [defenses, defenseGTE] = getManaCostVars(defenseEnums);
  const query = getCardsQuery();
  return useQuery(query, {
    variables: {
      searchText: text || null,
      factionIds: factions && factions.length ? factions : null,
      rarities: rarities && rarities.length ? rarities : null,
      manaCosts: manaCosts && manaCosts.length ? manaCosts : null,
      manaGTE: manaCostGTE || null,
      strengths: strengths && strengths.length ? strengths : null,
      strengthGTE: strengthGTE || null,
      defenses: defenses && defenses.length ? defenses : null,
      defenseGTE: defenseGTE || null,
      supertypes:
        supertypes && supertypes.length
          ? supertypes.map(s => s.toUpperCase())
          : null
    }
  });
};
