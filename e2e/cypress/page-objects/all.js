const pagingTotal = '[data-cy="pagingControlsTotal"]';
const getPagingTotalAsInt = () => {
  return cy.get(pagingTotal).then(el => {
    return el && el.length ? parseInt(el[0].innerText, 10) : 0;
  });
};

const dcy = s => `[data-cy="${s}"]`;

export default {
  cardListCard: '[data-cy="cardListCard"]',
  cardList: '[data-cy="cardList"]',
  header: '[data-cy="header"]',
  factionFilter: '[data-cy="factionFilter"]',
  cardSearch: '[data-cy="cardSearch"]',
  cardSelectionItem: '[data-cy="cardSelectionItem"]',
  deckPreview: '[data-cy="deckPreview"]',

  pagingTotal,
  getPagingTotalAsInt,

  // deck builder page
  deckBuilderCollection: '[data-cy="deckBuilderCollection"]',
  deckInProgress: '[data-cy="deckInProgress"]',
  deckCardRow: '[data-cy="deckCardRow"]',
  clearButton: '[data-cy="searchForm_clearButton"]',

  cardSearchText: '[data-cy="cardSearchText"]',
  cardSearchSubmit: '[data-cy="cardSearchSubmit"]',

  superTypePicker: '[data-cy="cardSearch_supertype"]',
  superTypePickerBtn:
    '[data-cy="cardSearch_supertype"] [data-cy="imgFilterBtn"]',
  manaPicker: '[data-cy="cardSearch_manaCost"]',
  strengthPicker: '[data-cy="cardSearch_strength"]',
  defensePicker: '[data-cy="cardSearch_defense"]',
  defensePickerBtn: '[data-cy="cardSearch_defense"] [data-cy="numFilterBtn"]',
  rarityPicker: '[data-cy="cardSearch_rarity"]',
  rarityPickerBtn: '[data-cy="cardSearch_rarity"] [data-cy="imgFilterBtn"]',

  // decks page
  deckFactionsPicker: '[data-cy="deckFactionsCell"] img',
  deckEssencePicker: '[data-cy="deckEssenceCell"]',
  decksSort: dcy('decksSort'),
  deckListItem: dcy('deckListItem'),
  deckSearchDeckName: dcy('deckSearchDeckName'),
  deckSearchDeckArchetype: dcy('deckSearchArchetype'),
  deckSearchDeckType: dcy('deckSearchType'),
  deckSearchClear: dcy('deckSearchClear'),
  deckSearchAllDecksLoaded: dcy('all-decks-loaded'),
  deckArchetypePicker: dcy('deckArchetypeCell'),
  deckTypePicker: dcy('deckTypeCell'),

  // decks page sorted data
  // used so cypress can know when newly sorted dom is loaded.
  deckListNewestFirst: '[data-cy-decksort="dateDesc"]',
  deckListOldestFirst: '[data-cy-decksort="dateAsc"]',
  deckListCheapestFirst: '[data-cy-decksort="essenceAsc"]',
  deckListCostliestFirst: '[data-cy-decksort="essenceDesc"]',
  deckListNameAtoZ: '[data-cy-decksort="nameAsc"]',
  deckListNameZtoA: '[data-cy-decksort="nameDesc"]',
  deckListRatingHighToLow: '[data-cy-decksort="ratingDesc"]',
  deckListRatingLowToHigh: '[data-cy-decksort="ratingAsc"]',

  // deck page
  deckName: '[data-cy="deckName"]',

  // slider
  leftSlider: '[data-cy="leftSlider"]',
  rightSlider: '[data-cy="rightSlider"]'
};
