describe('Account', function() {
  it('should load', function() {
    cy.visit('/account?name=lsv');
    cy.get('[data-cy="profile-name"]').should('contain', 'lsv');
    cy.get('[data-cy="userNewestDecks"] li').should('have.length', 3);
    cy.get('[data-cy="userTopDecks"] li').should('have.length', 3);
    cy.get('[data-cy="userAvatar"]').should('have.length', 1);
  });
});
