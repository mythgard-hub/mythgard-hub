import {
  cardSearch,
  cardSelectionItem,
  factionFilter,
  deckName,
  deckFactionsPicker,
  deckEssencePicker,
  deckListItem,
  decksSort,
  deckSearchDeckName,
  deckSearchClear,
  deckSearchAllDecksLoaded,
  deckListHotFirst,
  deckListNewestFirst,
  deckListOldestFirst,
  deckListCheapestFirst,
  deckListCostliestFirst,
  deckListNameAtoZ,
  deckListNameZtoA,
  deckListRatingHighToLow,
  deckListRatingLowToHigh,
  deckArchetypePicker,
  deckTypePicker,
  deckSearchDeckArchetype,
  deckSearchDeckType
} from '../page-objects/all';

const cardSearchSelections = `${cardSearch} ${cardSelectionItem}`;

const hot = 'hot';
const newestFirst = 'dateDesc';
const oldestFirst = 'dateAsc';
const essenceAsc = 'essenceAsc';
const essenceDesc = 'essenceDesc';
const nameAsc = 'nameAsc';
const nameDesc = 'nameDesc';
const ratingDesc = 'ratingDesc';
const ratingAsc = 'ratingAsc';

const deckNameAllFactions = 'all_factions';
const deckNameDragons = 'dragons';
const deckNameCats = 'cats';
const numAllDecks = 12;
const numRecentDecks = 9;
const numCatDecks = 3;
const numNordenDecks = 3;

describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });

  it('works', function() {
    // Should show deck votes
    cy.get('[data-cy="deckVotesCell"]').should('have.length', numRecentDecks);
    cy.get('[data-cy="userAvatar"]').should('have.length', numRecentDecks);
    cy.get('[data-cy="deckVotesCell"]:first').should('contain', 7);
    cy.get(deckArchetypePicker).should('have.length', numRecentDecks);
    cy.get(deckTypePicker).should('have.length', numRecentDecks);
    cy.get(deckArchetypePicker)
      .eq(0)
      .should('contain', 'Unknown');
    cy.get(deckArchetypePicker)
      .eq(1)
      .should('contain', 'Midrange');
    cy.get(deckTypePicker)
      .eq(2)
      .should('contain', 'Gauntlet');
    cy.get(deckTypePicker)
      .eq(1)
      .should('contain', 'Tournament');
    cy.get(deckTypePicker)
      .eq(0)
      .should('contain', 'Standard');

    cy.get('[data-cy="deckListItem"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck', 'links to decks work');
    });
    cy.get(deckName).should('have.length', 1);
  });

  it('should search for decks and clear filters', function() {
    // search by archetype
    // specific archetype
    cy.get(deckSearchDeckArchetype).select('Midrange');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 3);
    cy.get(deckArchetypePicker)
      .eq(0)
      .should('contain', 'Midrange');
    // all archetypes
    cy.get(deckSearchDeckArchetype).select('Any');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);
    cy.get(deckArchetypePicker)
      .eq(0)
      .should('contain', 'Unknown');
    cy.get(deckArchetypePicker)
      .eq(1)
      .should('contain', 'Midrange');
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // search by type
    // specific type
    cy.get(deckSearchDeckType).select('Standard');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 4);
    cy.get(deckTypePicker)
      .eq(0)
      .should('contain', 'Standard');
    cy.get(deckSearchDeckType).select('2v2');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 0);

    // any type
    cy.get(deckSearchDeckType).select('Any');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);
    cy.get(deckTypePicker)
      .eq(0)
      .should('contain', 'Standard');
    cy.get(deckTypePicker)
      .eq(1)
      .should('contain', 'Tournament');
    cy.get(deckTypePicker)
      .eq(2)
      .should('contain', 'Gauntlet');
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // search by name
    cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    cy.get('[data-cy="deckSearchDeckName"]').type('cat');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numCatDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
    cy.get(deckFactionsPicker).should('have.length', 6);
    cy.get(deckEssencePicker).should('contain', '50');
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // search by name (search via enter)
    cy.get('[data-cy="deckSearchDeckName"]').type('cat{enter}');
    cy.get('[data-cy="deckListItem"]').should('have.length', numCatDecks);
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // searh by included cards
    cy.get(`${cardSearch} input`).type('drag');
    cy.get(`${cardSearch} input`).type('{enter}');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get(cardSearchSelections).should('have.length', 1);
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 5);
    cy.get(`${cardSearch} input`).type('harm');
    cy.get(`${cardSearch} input`).type('{enter}');
    cy.get(cardSearchSelections).should('have.length', 2);
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 2);
    cy.get(deckSearchClear).click();
    cy.get(cardSearchSelections).should('have.length', 0);
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // search by faction - contains only that faction
    cy.get(`${factionFilter}`)
      .eq(3)
      .click();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 3);
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // search by faction - contains at least this faction
    cy.get(`${factionFilter}:first`).click();
    cy.get(`[data-cy="leftSlider"]`).click();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 6);
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);

    // test deck author search
    cy.get('[data-cy="deckSearchDeckAuthor"]').type('lsv');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', 3);
    cy.get(deckSearchClear).click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numRecentDecks);
  });

  it('should search decks by name', function() {
    cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    cy.get('[data-cy="deckSearchSubmit"]').click();

    // test deck name search - full name with spaces
    cy.get('[data-cy="deckSearchDeckName"]').type('norden aztlan');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');

    // Clear
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - first full word and start of the second
    cy.get('[data-cy="deckSearchDeckName"]').type('norden azt');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - start of the first word and full second word
    cy.get('[data-cy="deckSearchDeckName"]').type('nor aztlan');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - start of both words
    cy.get('[data-cy="deckSearchDeckName"]').type('nor azt');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - full name with spaces (multiple spaces)
    cy.get('[data-cy="deckSearchDeckName"]').type(' nor   azt ');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - first full word and start of the second (multiple spaces)
    cy.get('[data-cy="deckSearchDeckName"]').type(' norden azt ');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - start of the first word and full second word (multiple spaces)
    cy.get('[data-cy="deckSearchDeckName"]').type('  nor  aztlan  ');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);

    // test deck name search - start of both words (multiple spaces)
    cy.get('[data-cy="deckSearchDeckName"]').type('  nor  azt   ');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numNordenDecks);
    cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    cy.get('[data-cy="deckSearchDeckName"]').clear();
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').should('have.length', numAllDecks);
  });

  it('should sort decks', function() {
    // the default search is hot
    cy.get(deckSearchAllDecksLoaded);
    cy.get(deckListItem)
      .find(deckName)
      .first()
      .should('contain', deckNameDragons);
    cy.get(decksSort).select(oldestFirst);
    cy.get(deckListOldestFirst);
    cy.get(deckListItem)
      .find(deckName)
      .first()
      .should('contain', deckNameDragons);
    cy.get(decksSort).select(essenceAsc);
    cy.get(deckListCheapestFirst);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', deckNameCats);
    cy.get(decksSort).select(essenceDesc);
    cy.get(deckListCostliestFirst);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', deckNameAllFactions);
    cy.get(decksSort).select(nameAsc);
    cy.get(deckListNameAtoZ);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', deckNameAllFactions);
    cy.get(decksSort).select(nameDesc);
    cy.get(deckListNameZtoA);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', 'other norden aztlan');
    cy.get(decksSort).select(ratingDesc);
    cy.get(deckListRatingHighToLow);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', deckNameDragons);
    cy.get('[data-cy="deckVotesCell"]:first').should('contain', 7);
    cy.get(decksSort).select(ratingAsc);
    cy.get(deckListRatingLowToHigh);
    cy.get('[data-cy="deckVotesCell"]:first').should('contain', 0);
    // this test differs from the first sort test in that
    // it uses some-decks rather than all-decks
    cy.get(decksSort).select(hot);
    cy.get(deckListHotFirst);
    cy.get(deckListItem)
      .find(deckName)
      .first()
      .should('contain', deckNameDragons);
  });
});
