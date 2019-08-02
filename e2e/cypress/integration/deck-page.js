describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('happy path card click', function() {
    cy.get('h1').should('have.class', 'deckName');
    cy.get('.cardList').should('have.length', 1);
    cy.get('.cardList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.contain('/card');
    });
  });
  it('happy path comments', function() {
    const commentSelector = '[data-cy=commentList] [data-cy=comment]';
    cy.get('[data-cy=commentList]').should('have.length', 1);
    cy.get(commentSelector).then(list => {
      cy.get('[data-cy=commentBody]').type('I made masters with this');
      cy.get('[data-cy=submit]').click();
      cy.get(commentSelector).should('have.length', list.length + 1);
      cy.get('[data-cy=commentBody]').should('have.value', '');
    });
  });
});
