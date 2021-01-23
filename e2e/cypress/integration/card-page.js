describe('Card Page', function() {
  beforeEach(() => {
    cy.visit('/card?id=1');
  });
  it('should work', function() {
    cy.get('[data-cy="cardName"]').should('be.visible');
    cy.get('[data-cy="cardPrimaryFaction"]').should('contain', 'Norden');
    cy.get('[data-cy="cardSecondaryFaction"]').should('contain', 'Aztlan');
    cy.get('[data-cy="cardTertiaryFaction"]').should('not.exist');
  });
});

describe('Card Page From Different Set', function() {
  beforeEach(() => {
    cy.visit('/card/19');
  });
  it('should work', function() {
    cy.get('[data-cy="cardName"]').should('be.visible');
    cy.get('[data-cy="cardName"]').should('contain', 'New Set');
    cy.get('[data-cy="cardPageCardSet"]').should(
      'contain',
      'Rings of Immortality'
    );
  });
});

describe('Card Page Metas', function() {
  beforeEach(() => {
    cy.visit('/card/1');
  });
  it('looks inside head tags', function() {
    cy.get('head title').should('contain', 'Furball');
    cy.get('head meta[name="description"]')
      .invoke('attr', 'content')
      .should('contain', 'Norden, 3B Common Minion, Cat, Core');
    cy.get('head meta[property="og:title"]')
      .invoke('attr', 'content')
      .should('contain', 'Furball');
    cy.get('head meta[property="og:description"]')
      .invoke('attr', 'content')
      .should('contain', 'Norden, 3B Common Minion, Cat, Core');
  });
});

describe('Card Page Metas From Different Set', function() {
  beforeEach(() => {
    cy.visit('/card?id=19');
  });
  it('looks inside head tags', function() {
    cy.get('head title').should('contain', 'New Set');
    cy.get('head meta[name="description"]')
      .invoke('attr', 'content')
      .should(
        'contain',
        'Harmony, 2PP Mythic Minion,enchantment, Vampire, Rings of Immortality'
      );
    cy.get('head meta[property="og:title"]')
      .invoke('attr', 'content')
      .should('contain', 'New Set');
    cy.get('head meta[property="og:description"]')
      .invoke('attr', 'content')
      .should(
        'contain',
        'Harmony, 2PP Mythic Minion,enchantment, Vampire, Rings of Immortality'
      );
  });
});

describe('Card Page With More Than 2 Factions', function() {
  beforeEach(() => {
    cy.visit('/card?id=18');
  });
  it('looks inside head tags', function() {
    cy.get('head title').should('contain', 'X Cost');
    cy.get('[data-cy="cardPrimaryFaction"]').should('contain', 'Norden');
    cy.get('[data-cy="cardSecondaryFaction"]').should('contain', 'Aztlan');
    cy.get('[data-cy="cardTertiaryFaction"]').should('contain', 'Oberos');
  });
});
