import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
                { subtype: { includesInsensitive: $searchText } }
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
                { def: { in: $defenses } }
                { def: { greaterThanOrEqualTo: $defenseGTE } }
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
          mana
          gem
          cardFactions {
            nodes {
              faction {
                name
              }
            }
          }
        }
      }
    }
  `;
};

// ['1', '3', '6+'] => [[1,3], 6]
export const intEnumsToGQLVars = manaCostEnums => {
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
  let [manaCosts, manaCostGTE] = intEnumsToGQLVars(manaCostEnums);
  const [strengths, strengthGTE] = intEnumsToGQLVars(strengthEnums);
  const [defenses, defenseGTE] = intEnumsToGQLVars(defenseEnums);
  const query = getCardsQuery();

  // always search for X cost cards if searching for mana costs
  if (manaCosts && manaCosts.length) {
    manaCosts = [...manaCosts, -1];
  } else if (manaCostGTE) {
    manaCosts = [-1];
  }

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
