describe('Event Page', function() {
  beforeEach(() => {
    cy.visit('/event/1');
  });
  it('should work', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="tourneyName"]').should('be.visible');
    cy.get('[data-cy="tourneyTop8Name"]').should('be.visible');
  });
});
