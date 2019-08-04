describe('Header', function() {
  it('should have working links', function() {
    cy.visit('/');
    cy.get('.header a[data-cy="home"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
    cy.get('.header a[data-cy="decks"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/decks');
    });
    cy.get('.header a[data-cy="home"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
    cy.get('.header a[data-cy="cards"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/cards');
    });
    cy.get('.header a[data-cy="deck-builder"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck-builder');
    });
  });
});
