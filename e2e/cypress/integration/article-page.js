describe('Articles Page', function() {
  beforeEach(() => {
    cy.visit('/articles');
  });
  it('works', function() {
    cy.get('.article').should('be.visible');
    cy.get('.article-author').should('be.visible');
  });
});
