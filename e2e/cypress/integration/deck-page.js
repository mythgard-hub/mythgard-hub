describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('happy path card click', function() {
    cy.get('[data-cy="deckCardTable"]').should('have.length', 1);
    cy.get('[data-cy="deckEssenceCell"]').should('be.visible');
    cy.get('[data-cy="factionsIndicator"]').should('be.visible');
    cy.get('[data-cy="deckCreatedDate"]').should('be.visible');
    cy.get('[data-cy="deckVoteCount"]').should('contain', 1);
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
    cy.get('head meta[name="description"]')
      .invoke('attr', 'content')
      .should('contain', 'Standard Mythgard Deck, YB, 50 Essence');
    cy.get('head meta[property="og:title"]')
      .invoke('attr', 'content')
      .should('contain', 'cats by lsv');
    cy.get('head meta[property="og:description"]')
      .invoke('attr', 'content')
      .should('contain', 'Standard Mythgard Deck, YB, 50 Essence');
  });
});
