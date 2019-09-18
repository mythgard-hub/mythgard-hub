describe('Events Page', function() {
  beforeEach(() => {
    cy.visit('/events');
  });
  it('should work', function() {
    cy.get('[data-cy="header"]').should('be.visible');
  });
});
