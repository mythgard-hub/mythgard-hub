describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });
  it('should have working links', function() {
    cy.get('li a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck');
    });
    cy.get('h1').should('have.class', 'deckName');
  });
  it('should search for decks', function() {
    cy.get('input.name').type('cat');
    cy.get('input[type="submit"]').click();
    cy.get('li').should('have.length', 1);
    cy.get('li a').should('contain', 'cat');
  });
});
