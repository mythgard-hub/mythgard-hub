describe('Tournaments Page', function() {
  beforeEach(() => {
    cy.visit('/tournaments');
  });
  it('should have a list of clickable tournaments', function() {
    cy.get('[data-cy="tournaments"]').should('have.class', 'selected');
    cy.get('[data-cy=tournamentList] [data-cy=tournamentListItem]').should(
      'have.length',
      2
    );

    cy.get('[data-cy=tournamentList] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/tournament');
    });
  });
});
