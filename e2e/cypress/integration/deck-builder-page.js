import {
  cardListCard,
  deckBuilderCollection,
  deckInProgress,
  cardList,
  factionFilter,
  deckCardRow,
  cardSearchText
} from '../page-objects/all';

describe('Deck builder page', () => {
  beforeEach(() => {
    cy.visit('/deck-builder');
  });
  it('should have a happy path', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="importDeckTitle"]').should('be.visible');
    cy.get('[data-cy="importDeckTextarea"]').should('be.visible');
    cy.get('[data-cy="importDeckButton"]').should('be.visible');
    cy.get(cardList).should('be.visible');
    cy.get(deckInProgress).should('be.visible');
    cy.get('[data-cy="factionFilters"]').should('be.visible');
    cy.get(`${cardListCard}:first`).click();
    cy.get(deckInProgress).should('be.visible');
    cy.get(deckCardRow).should('have.length', 1);

    // basic test - faction filter
    let numCardsBeforeFilter;
    cy.get(`${deckBuilderCollection} ${cardListCard}`)
      .then(cards => {
        numCardsBeforeFilter = cards.length;
        cy.get(`${factionFilter}:first`).click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.be.above(cards.length);
        cy.get(`${factionFilter}:first`).click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.equal(cards.length);

        // basic test - text filter
        cy.get(cardSearchText).type('fur');
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.be.above(cards.length);
        cy.get(cardSearchText).clear();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.equal(cards.length);

        // basic test - rarity filter
        cy.get('[data-cy="cardSearch_rarity"] input:first').click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.be.above(cards.length);
        cy.get('[data-cy="cardSearch_rarity"] input:first').click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.equal(cards.length);

        // basic test - mana cost filter
        cy.get('[data-cy="cardSearch_manaCost"] input')
          .eq(2)
          .click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.be.above(cards.length);
        cy.get('[data-cy="cardSearch_manaCost"] input')
          .eq(2)
          .click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.equal(cards.length);

        // basic test - mana cost filter
        cy.get('[data-cy="cardSearch_supertype"] input')
          .eq(1)
          .click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.be.above(cards.length);
        cy.get('[data-cy="cardSearch_supertype"] input')
          .eq(1)
          .click();
        return cy.get(`${deckBuilderCollection} ${cardListCard}`);
      })
      .then(cards => {
        expect(numCardsBeforeFilter).to.equal(cards.length);

        // finally save the deck
        cy.get('[data-cy="deckTitle"]').type('Floop the Pig');
        cy.get('[data-cy="saveDeck"]').click();
        return cy.location().should(location => {
          expect(location.pathname).to.eq('/deck');
        });
      });
  });

  it('should import a deck', function() {
    const input = [
      'name: my deck',
      'path: my path',
      'power: my power',
      'coverart: myself',
      '1 Dragon',
      '2 Imp'
    ].join('\n');

    cy.get('[data-cy="importDeckTextarea"]').type(input);
    cy.get('[data-cy="importDeckButton"]').click();

    cy.get('[data-cy="deckTitle"]').should('have.value', 'my deck');
    cy.get(deckCardRow).should('have.length', 2);

    cy.get('[data-cy="importDeckButton"]').click();

    cy.get('[data-cy="deckTitle"]').should('have.value', 'my deck');
    cy.get(deckCardRow).should('have.length', 2);
  });

  it('should export a deck', function() {
    const input = [
      'name: my deck',
      'path: my path',
      'power: my power',
      'coverart: myself',
      '1 Dragon',
      '2 Imp'
    ].join('\n');

    cy.get('[data-cy="importDeckTextarea"]').type(input);
    cy.get('[data-cy="importDeckButton"]').click();
    cy.get('[data-cy="exportDeckButton"]').click();

    cy.get('[data-cy="exportDeckSuccess"]').contains('Copied');
  });
});
