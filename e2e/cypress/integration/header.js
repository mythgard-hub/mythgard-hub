describe('Header', function() {
  it('should have working links', function() {
    cy.visit('/');
    cy.get('.header a.home').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
    cy.get('.header a.decks').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/decks');
    });
    cy.get('.header a.home').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
  it('should get to /cards', function() {
    cy.visit('/');
    cy.get('.header a.cards').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/cards');
    });
  });
});
