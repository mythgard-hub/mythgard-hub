describe('Card Page', function() {
  beforeEach(() => {
    cy.visit('/card?id=1');
  });
  it('should work', function() {
    cy.get('[data-cy="cardName"]').should('be.visible');
  });
});

describe('Card Page Metas', function() {
  beforeEach(() => {
    cy.visit('/card/1');
  });
  it('looks inside head tags', function() {
    cy.get('head title').should('contain', 'Furball');
    cy.get('head meta[name="description"]').should('have.attr', 'content', 'Norden, 3B Common Minion, Cat, Core');
    cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'Furball | Mythgard Hub');
    cy.get('head meta[property="og:description"]').should('have.attr', 'content', 'Norden, 3B Common Minion, Cat, Core');
  });

});