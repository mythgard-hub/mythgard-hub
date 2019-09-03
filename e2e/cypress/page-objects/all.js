const pagingTotal = '[data-cy="pagingControlsTotal"]';
const getPagingTotalAsInt = () => {
  return cy.get(pagingTotal).then(el => {
    return el && el.length ? parseInt(el[0].innerText, 10) : 0;
  });
};

export default {
  cardListCard: '[data-cy="cardListCard"]',
  cardList: '[data-cy="cardList"]',
  header: '[data-cy="header"]',
  factionFilter: '[data-cy="factionFilter"]',
  cardSearch: '[data-cy="cardSearch"]',
  cardSelectionItem: '[data-cy="cardSelectionItem"]',

  pagingTotal,
  getPagingTotalAsInt,

  // deck builder page
  deckBuilderCollection: '[data-cy="deckBuilderCollection"]',
  deckInProgress: '[data-cy="deckInProgress"]',
  deckCardRow: '[data-cy="deckCardRow"]',

  cardSearchText: '[data-cy="cardSearchText"]',
  cardSearchSubmit: '[data-cy="cardSearchSubmit"]',

  superTypePicker: '[data-cy="cardSearch_supertype"]',
  manaPicker: '[data-cy="cardSearch_manaCost"]',
  strengthPicker: '[data-cy="cardSearch_strength"]',
  defensePicker: '[data-cy="cardSearch_defense"]',
  rarityPicker: '[data-cy="cardSearch_rarity"]'
};
