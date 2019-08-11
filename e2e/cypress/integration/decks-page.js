import { cardListCard, cardSearch } from '../page-objects/all';

const cardSeachSelections = `${cardSearch} ${cardListCard}`;

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
    cy.get('[data-cy="deckListItem"]').then(list => {
      const initialListLength = list.length;
      cy.get(`${cardSearch} input`).type('fur');
      cy.get(`${cardSearch} input`).type('{enter}');
      cy.get(cardSeachSelections).should('have.length', 1);
      cy.get('[data-cy="deckSearchDeckName"]').type('cat');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get(cardSeachSelections).click();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );
    });
  });
});
