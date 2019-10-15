describe('Event Page', function() {
  beforeEach(() => {
    cy.visit('/event/1');
  });
  it('should work', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="tourneyName"]').should('be.visible');
    cy.get('[data-cy="tourneyTop8Name"]').should('be.visible');
    cy.get('[data-cy="tourneyLink"]')
      .then(e => {
        expect(e).to.have.attr('href', 'http://www.mythgardhub.com');
      })
      .then(() => {
        cy.get('[data-cy="tourneyDeckLink"]')
          .first()
          .click();
        cy.location().should(location => {
          expect(location.pathname).to.eq('/deck');
        });
      });
  });
});
