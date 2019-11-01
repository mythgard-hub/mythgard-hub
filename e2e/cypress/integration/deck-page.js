describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('happy path card click', function() {
    cy.get('[data-cy="deckCardTable"]').should('have.length', 1);
    cy.get('[data-cy="deckEssenceCell"]').should('be.visible');
    cy.get('[data-cy="factionsIndicator"]').should('be.visible');
    cy.get('[data-cy="deckCreatedDate"]').should('be.visible');
    cy.get('[data-cy="deckCardTable"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.contain('/card');
    });
  });
});

describe('Deck Page Metas', function() {
  beforeEach(() => {
    cy.visit('/deck/2');
  });
  it('looks inside head tags', function() {
    cy.get('head title').should('contain', 'cats by lsv');
    cy.get('head meta[name="description"]').should('have.attr', 'content', 'Standard Mythgard Deck, B, 50 Essence, Updated Oct 24, 2019');
    cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'cats by lsv | Mythgard Hub');
    cy.get('head meta[property="og:description"]').should('have.attr', 'content', 'Standard Mythgard Deck, B, 50 Essence, Updated Oct 24, 2019');
  });

});