describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('has a name', function() {
    cy.get('h1').should('have.class', 'deckName');
  });
});
