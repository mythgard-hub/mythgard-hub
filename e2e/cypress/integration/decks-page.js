import {
  cardSearch,
  cardSelectionItem,
  factionFilter
} from '../page-objects/all';

const cardSearchSelections = `${cardSearch} ${cardSelectionItem}`;

describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });
  it('works', function() {
    cy.get('[data-cy="deckListItem"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck');
    });
    cy.get('h1').should('have.class', 'deckName');
  });

  it('should search for decks', function() {
    cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    cy.get('[data-cy="deckListItem"]').then(list => {
      // test deck name search
      const initialListLength = list.length;
      cy.get('[data-cy="deckSearchDeckName"]').type('cat');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');

      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test search by card name included
      let lengthAfterOneFilter;
      cy.get(`${cardSearch} input`).type('drag');
      cy.get(`${cardSearch} input`).type('{enter}');
      cy.get(cardSearchSelections).should('have.length', 1);
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]')
        .then(cards => {
          lengthAfterOneFilter = cards.length;
          expect(lengthAfterOneFilter).to.be.lessThan(initialListLength);
          cy.get(`${cardSearch} input`).type('harm');
          cy.get(`${cardSearch} input`).type('{enter}');
          cy.get(cardSearchSelections).should('have.length', 2);
          cy.get('[data-cy="deckSearchSubmit"]').click();
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(lengthAfterOneFilter);
        })
        .then(() => {
          cy.get(`${cardSearchSelections} button`).should('have.length', 2);
          cy.get(`${cardSearchSelections} button`).click({ multiple: true });
          cy.get(cardSearchSelections).should('have.length', 0);
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck faction search
          cy.get(`${factionFilter}:first`).click();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(initialListLength);
          cy.get(`${factionFilter}:first`).click();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );
        });
    });
  });
});
