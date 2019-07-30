describe('Tournaments Page', function() {
  beforeEach(() => {
    cy.visit('/tournaments');
  });
  it('should have a list of clickable tournaments', function() {
    cy.get('ul.tournamentList li').should('have.length', 2);

    cy.get('ul.tournamentList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/tournament');
    });
  })
})