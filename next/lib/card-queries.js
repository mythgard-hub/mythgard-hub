import gql from 'graphql-tag';

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

export const getCardsQuery = filters => {
  return gql`
    query cards($searchText: String){
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
