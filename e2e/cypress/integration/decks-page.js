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
  deckListOldestFirst,
  deckListCheapestFirst,
  deckListCostliestFirst
} from '../page-objects/all';

const cardSearchSelections = `${cardSearch} ${cardSelectionItem}`;

const newestFirst = 'dateDesc';
const oldestFirst = 'dateAsc';
const essenceAsc = 'essenceAsc';
const essenceDesc = 'essenceDesc';
const nameAsc = 'nameAsc';
const ratingDesc = 'ratingDesc';
const ratingAsc = 'ratingAsc';
const nameDesc = 'nameDesc';

describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });
  it('works', function() {
    cy.get('[data-cy="deckListItem"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck', 'links to decks work');
    });
    cy.get(deckName).should('have.length', 1);
  });

  it('should search for decks and clear filters', function() {
    // // search by name
    // cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    // cy.get('[data-cy="deckSearchDeckName"]').type('cat');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
    // cy.get(deckFactionsPicker).should('have.length', '2');
    // cy.get(deckEssencePicker).should('contain', '50');
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // // search by name (search via enter)
    // cy.get('[data-cy="deckSearchDeckName"]').type('cat{enter}');
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // // searh by included cards
    // cy.get(`${cardSearch} input`).type('drag');
    // cy.get(`${cardSearch} input`).type('{enter}');
    // cy.get(cardSearchSelections).should('have.length', 1);
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 2);
    // cy.get(`${cardSearch} input`).type('harm');
    // cy.get(`${cardSearch} input`).type('{enter}');
    // cy.get(cardSearchSelections).should('have.length', 2);
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get(cardSearchSelections).should('have.length', 0);
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // // search by faction - contains only that faction
    // cy.get(`${factionFilter}`)
    //   .eq(3)
    //   .click();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // // search by faction - contains at least this faction
    // cy.get(`${factionFilter}:first`).click();
    // cy.get(`[data-cy="leftSlider"]`).click();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 2);
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // // test deck author search
    // cy.get('[data-cy="deckSearchDeckAuthor"]').type('lsv');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 2);
    // cy.get('[data-cy="deckSearchClear"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 3);

    // cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // // test deck name search - full name with spaces
    // cy.get('[data-cy="deckSearchDeckName"]').type('norden aztlan');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - first full word and start of the second
    // cy.get('[data-cy="deckSearchDeckName"]').type('norden azt');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - start of the first word and full second word
    // cy.get('[data-cy="deckSearchDeckName"]').type('nor aztlan');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - start of both words
    // cy.get('[data-cy="deckSearchDeckName"]').type('nor azt');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - full name with spaces (multiple spaces)
    // cy.get('[data-cy="deckSearchDeckName"]').type(' nor   azt ');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - first full word and start of the second (multiple spaces)
    // cy.get('[data-cy="deckSearchDeckName"]').type(' norden azt ');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - start of the first word and full second word (multiple spaces)
    // cy.get('[data-cy="deckSearchDeckName"]').type('  nor  aztlan  ');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // // test deck name search - start of both words (multiple spaces)
    // cy.get('[data-cy="deckSearchDeckName"]').type('  nor  azt   ');
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 1);
    // cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');
    // cy.get('[data-cy="deckSearchDeckName"]').clear();
    // cy.get('[data-cy="deckSearchSubmit"]').click();
    // cy.get('[data-cy="deckListItem"]').should('have.length', 4);

    // test deck sort
    cy.get(decksSort).select(newestFirst);
    cy.get(deckListItem)
      .find(deckName)
      .first()
      .should('contain', 'all_factions');
    cy.get(decksSort).select(oldestFirst);
    cy.get(deckListOldestFirst);
    cy.get(deckListItem)
      .find(deckName)
      .first()
      .should('contain', 'dragons');
    cy.get(decksSort).select(essenceAsc);
    cy.get(deckListCheapestFirst);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', 'cats');
    cy.get(decksSort).select(essenceDesc);
    cy.get(deckListCostliestFirst);
    cy.get(deckListItem)
      .first()
      .find(deckName)
      .should('contain', 'dragons');
    // cy.get(decksSort).select(nameAsc);
    // cy.get(deckListItem)
    //   .first()
    //   .find(deckName)
    //   .should('contain', 'all_factions');
    // cy.get(decksSort).select(nameDesc);
    // cy.get(deckListItem)
    //   .first()
    //   .find(deckName)
    //   .should('contain', 'dragons');
    // cy.get(decksSort).select(ratingDesc);
    // cy.get(deckListItem)
    //   .first()
    //   .find(deckName)
    //   .should('contain', 'dragons');
    // cy.get(decksSort).select(ratingAsc);
    // cy.get(deckListItem)
    //   .find(deckName)
    //   .first()
    // .should('contain', 'cats');
  });
});
