import {
  cardListCard,
  deckInProgress,
  cardList,
  factionFilter,
  deckCardRow,
  cardSearchText,
  superTypePicker,
  manaPicker,
  rarityPicker,
  getPagingTotalAsInt,
  leftLabel,
  rightLabel
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

    // basic test - add some cards to the deck
    cy.get(`${cardListCard}:first`).click();
    cy.get(`${cardListCard}:first`).click();
    cy.get(`${cardListCard}`)
      .eq(2)
      .click();
    cy.get(deckInProgress).should('be.visible');
    cy.get(deckCardRow).should('have.length', 2);

    // basic test - delete a card from the deck
    cy.get('[data-cy="deckDeleteCard"]:first').click();
    cy.get(deckInProgress).should('be.visible');
    cy.get(deckCardRow).should('have.length', 1);

    // basic test - faction filter
    let numCardsBeforeFilter;
    getPagingTotalAsInt()
      .then(length => {
        numCardsBeforeFilter = length;
        cy.get(`${factionFilter}:first`).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(`${factionFilter}:first`).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - text filter
        cy.get(cardSearchText).type('fur');
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(cardSearchText).clear();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - rarity filter
        cy.get(rightLabel).click();
        cy.get(`${rarityPicker} img:first`).click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightLabel).click();
        cy.get(`${rarityPicker} img:first`).click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - mana cost filter
        cy.get(rightLabel).click();
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightLabel).click();
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - supertype filter
        cy.get(rightLabel).click();
        cy.get(`${superTypePicker} img`)
          .eq(1)
          .click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightLabel).click();
        cy.get(`${superTypePicker} img`)
          .eq(1)
          .click();
        cy.get(leftLabel).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // finally try to save the deck and fail
        cy.get('[data-cy="deckTitle"]').type('Floop the Pig');
        cy.get('[data-cy="saveDeck"]').click();
        cy.on('window:alert', str => {
          expect(str).to.equal(
            'You are not logged in. You will be dealt with in another PR'
          );
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
