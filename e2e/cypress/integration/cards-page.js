describe('Card Page', function() {
  beforeEach(() => {
    cy.visit('/cards');
  });
  it('has a list', function() {
    cy.get('ul.cardList li').should('have.length', 4);
  });
  it('should have working links', function() {
    cy.get('ul.cardList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/card');
    });
    cy.get('h1').should('have.class', 'cardName');
  });
});
