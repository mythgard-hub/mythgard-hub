describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('has a name and cards, ', function() {
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
  it('should have comments', function() {
    cy.get('.commentList').should('have.length', 1);
  });
  it('should add a comment', async function() {
    const list = await cy.get('.commentList li');
    const beforeLength = list.length;
    assert.equal(true, true);
    cy.get('input.commentBody').type('I made masters with this');
    cy.get('input[type="submit"]').click();
    cy.get('.commentList li').should('have.length', beforeLength + 1);
  });
});
