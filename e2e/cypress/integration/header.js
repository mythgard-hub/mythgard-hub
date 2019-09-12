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
    cy.get('[data-cy="decks"]').should('have.class', 'selected');

    cy.get('.header a[data-cy="home"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });

    cy.get('.header a[data-cy="tournaments"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/tournaments');
    });
    cy.get('[data-cy="tournaments"]').should('have.class', 'selected');

    cy.get('.header a[data-cy="cards"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/cards');
    });
    cy.get('[data-cy="cards"]').should('have.class', 'selected');

    cy.get('.header a[data-cy="deck-builder"]').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck-builder');
    });
    cy.get('[data-cy="deck-builder"]').should('have.class', 'selected');
  });
});
