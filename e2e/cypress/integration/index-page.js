describe('Index Page', function() {
  beforeEach(() => {
    cy.visit('/');
  });
  it('home page', function() {
    cy.get('[data-cy=topDecks] [data-cy=deckPreview]').should('have.length', 1);
    cy.get('[data-cy=newDecks] [data-cy=deckPreview]').should('have.length', 3);
  });
});
