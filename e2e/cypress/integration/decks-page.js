describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });
  it('should have working links', function() {
    cy.get('[data-cy="deckListItem"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck');
    });
    cy.get('h1').should('have.class', 'deckName');
  });
  it('should search for decks', function() {
    cy.get('[data-cy="deckListItem"]').then(list => {
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
    });
  });
});
