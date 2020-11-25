describe('Spoilers Page', function() {
  beforeEach(() => {
    cy.visit('/spoilers');
  });
  it('should work', function() {
    cy.get('[data-cy="spoilerImg"]').should('be.visible');
  });
});
