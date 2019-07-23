describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('has a name', function() {
    cy.get('h1').should('have.class', 'deckName');
  });
  it('should have cards', function() {
    cy.get('.cardList').should('have.length', 1);
  });
  it('should link from cards to /card', function() {
    cy.get('.cardList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.contain('/card');
    });
  });
});
