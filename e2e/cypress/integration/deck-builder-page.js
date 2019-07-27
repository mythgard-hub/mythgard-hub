describe('Deck builder page', () => {
  beforeEach(() => {
    cy.visit('/deck-builder');
  });
  it('should have a happy path', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="cardList"]').should('be.visible');
    cy.get('[data-cy="deckInProgress"]').should('be.visible');
  });
});
