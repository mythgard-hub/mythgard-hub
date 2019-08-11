describe('Cards Page', function() {
  beforeEach(() => {
    cy.visit('/cards');
  });
  it('works', function() {
    cy.get('ul.cardList li').should('be.visible');
    cy.get('ul.cardList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/card');
    });
    cy.get('h1').should('have.class', 'cardName');
  });
});
