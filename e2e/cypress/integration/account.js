describe('Account', function() {
  it('should load', function() {
    cy.visit('/account?name=lsv');
    cy.get('[data-cy="profile-name"]').should('contain', 'lsv');
    cy.get('[data-cy="user-deck"]').should('have.length', 2);
    cy.get('[data-cy="userAvatar"]').should('have.length', 1);
  });
});
