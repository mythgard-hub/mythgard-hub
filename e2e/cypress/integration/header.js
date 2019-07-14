describe('Header', function() {
  it('should have working links', function() {
    cy.visit('/');
    cy.get('.header a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
    cy.get('.header a:nth-child(2)').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/decks');
    });
    cy.get('.header a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
