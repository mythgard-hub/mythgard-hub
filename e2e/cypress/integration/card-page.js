describe('Card Page', function() {
  beforeEach(() => {
    cy.visit('/card?id=1');
  });
  it('should work', function() {
    cy.get('[data-cy="cardName"]').should('be.visible');
    cy.get('[data-cy="cardRules"]').should('be.visible');
  });
});
