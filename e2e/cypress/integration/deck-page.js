describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/1');
  });
  it('deck page elements', function() {
    cy.get('[data-cy="editMetaValue"]').should('not.be.visible');
    cy.get('[data-cy="userLink"]').should('not.be.visible');
    cy.get('[data-cy="deckPageType"]').should('be.visible');
    cy.get('[data-cy="deckPageArchetype"]').should('be.visible');
    cy.get('[data-cy="deckPageCardCount"]').should('be.visible');
    cy.get('[data-cy="deckManaCurve"]').should('be.visible');
    cy.get('[data-cy="deckPageType"]').should('contain', 'Standard');
    cy.get('[data-cy="deckPageArchetype"]').should('contain', 'Unknown');
    cy.get('[data-cy="deckPageCardCount"]').should('contain', '2');
  });

  it('happy path card click', function() {
    cy.get('[data-cy="deckCardTable"]').should('have.length', 1);
    cy.get('[data-cy="deckEssenceCell"]').should('be.visible');
    cy.get('[data-cy="factionsIndicator"]').should('be.visible');
    cy.get('[data-cy="deckCreatedDate"]').should('be.visible');
    cy.get('[data-cy="deckVoteCount"]').should('contain', 3);
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
