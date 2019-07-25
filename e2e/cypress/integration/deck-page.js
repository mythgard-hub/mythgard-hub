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
  it('happy path comments', async function() {
    cy.get('.commentList').should('have.length', 1);
    const list = await cy.get('.commentList li');
    const beforeLength = list.length;
    assert.equal(true, true);
    cy.get('input.commentBody').type('I made masters with this');
    cy.get('input[type="submit"]').click();
    cy.get('.commentList li').should('have.length', beforeLength + 1);
  });
});
