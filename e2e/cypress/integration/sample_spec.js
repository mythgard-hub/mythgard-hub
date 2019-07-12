describe('Home Page', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });
  it('has a header', function() {
    cy.get('h1').should('have.text', 'Cards');
  });
});
