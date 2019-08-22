describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('happy path card click', function() {
    cy.get('[data-cy=deckCardList]').should('have.length', 1);
    cy.get('[data-cy=deckCardList] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.contain('/card');
    });
  });
});
