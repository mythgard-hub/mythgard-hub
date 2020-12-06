describe('Deck Page', function() {
  beforeEach(() => {
    cy.visit('/deck/11');
  });
  it('deck page elements', function() {
    // Meta tags
    cy.get('head title').should(
      'contain',
      'all_factions_three by commonAccount'
    );
    cy.get('head meta[name="description"]')
      .invoke('attr', 'content')
      .should('contain', 'Gauntlet Mythgard Deck, YGPBRO, 12750 Essence');
    cy.get('head meta[property="og:title"]')
      .invoke('attr', 'content')
      .should('contain', 'all_factions_three by commonAccount');
    cy.get('head meta[property="og:description"]')
      .invoke('attr', 'content')
      .should('contain', 'Gauntlet Mythgard Deck, YGPBRO, 12750 Essence');

    // Page elements
    cy.get('[data-cy="editMetaValue"]').should('not.exist');
    cy.get('[data-cy="userAvatar"]').should('have.length', 1);
    cy.get('[data-cy="userLink"]').should('not.exist');
    cy.get('[data-cy="deckPageType"]').should('be.visible');
    cy.get('[data-cy="deckPageArchetype"]').should('be.visible');
    cy.get('[data-cy="deckPageCardCount"]').should('be.visible');
    cy.get('[data-cy="deckManaCurve"]').should('be.visible');
    cy.get('[data-cy="favoriteDeckButton"]').should('be.visible');
    cy.get('[data-cy="deckPageType"]').should('contain', 'Gauntlet');
    cy.get('[data-cy="deckPageArchetype"]').should('contain', 'Unknown');
    cy.get('[data-cy="deckPageCardCount"]').should('contain', '10');
    cy.get('[data-cy="viewsCell"]').should('contain', '4');
    cy.get('[data-cy="deckRarityCount"]')
      .eq(0)
      .should('contain', '3');
    cy.get('[data-cy="deckRarityCount"]')
      .eq(1)
      .should('contain', '1');
    cy.get('[data-cy="deckRarityCount"]')
      .eq(2)
      .should('contain', '1');
    cy.get('[data-cy="deckRarityCount"]')
      .eq(3)
      .should('contain', '5');
    cy.get('[data-cy="deckTypeCount"]')
      .eq(0)
      .should('contain', '7');
    cy.get('[data-cy="deckTypeCount"]')
      .eq(1)
      .should('contain', '1');
    cy.get('[data-cy="deckTypeCount"]')
      .eq(2)
      .should('contain', '1');
    cy.get('[data-cy="deckTypeCount"]')
      .eq(3)
      .should('contain', '1');
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
