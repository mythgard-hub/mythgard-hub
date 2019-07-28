describe('Deck builder page', () => {
  beforeEach(() => {
    cy.visit('/deck-builder');
  });
  it('should have a happy path', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="cardList"]').should('be.visible');
    cy.get('[data-cy="deckInProgress"]').should('be.visible');
    cy.get('[data-cy="cardListCard"]:first').click();
    cy.get('[data-cy="deckInProgress"]').should('be.visible');
    cy.get('[data-cy="deckCardListCard"]').should('have.length', 1);
    cy.get('[data-cy="deckTitle"]').type('Floop the Pig');
  });
});
