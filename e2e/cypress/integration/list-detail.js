describe('List detail', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });
  it('has a list', function() {
    cy.get('li').should('have.length', 2);
  });
  it('should have working links', function() {
    cy.get('li a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/card');
    });
    cy.get('h1').should('contain', 'Furball');
  });
});
