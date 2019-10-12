describe('Events Page', function() {
  beforeEach(() => {
    cy.visit('/events');
  });
  it('should work', function() {
    cy.get('[data-cy="upcomingTournamentListItem"]').should('be.visible');
    cy.get('[data-cy="completedTourneyName"]').should('be.visible');
    cy.get('[data-cy="header"]').should('be.visible');
  });
});
