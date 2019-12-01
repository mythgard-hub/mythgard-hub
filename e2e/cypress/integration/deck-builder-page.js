import {
  cardListCard,
  deckInProgress,
  cardList,
  clearButton,
  factionFilter,
  deckCardRow,
  cardSearchText,
  superTypePickerBtn,
  manaPicker,
  rarityPicker,
  rarityPickerBtn,
  getPagingTotalAsInt,
  leftSlider,
  rightSlider
} from '../page-objects/all';

describe('Deck builder page', () => {
  beforeEach(() => {
    cy.visit('/deck-builder', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
      }
    });
  });
  it('should have a happy path', function() {
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="goToImportMode"]').should('be.visible');
    cy.get('[data-cy="importDeckButton"]').should('not.be.visible');
    cy.get('[data-cy="deckBuilderActions"]').should('not.be.visible');
    cy.get('[data-cy="deckManaCurve"]').should('not.be.visible');
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
    cy.get('[data-cy="deckBuilderActions"]').should('be.visible');
    cy.get('[data-cy="deckManaCurve"]').should('be.visible');

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
        cy.get(rightSlider).click();
        cy.get(`${rarityPickerBtn}:first`).click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightSlider).click();
        cy.get(`${rarityPickerBtn}:first`).click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - mana cost filter
        cy.get(rightSlider).click();
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightSlider).click();
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);

        // basic test - supertype filter
        cy.get(rightSlider).click();
        cy.get(superTypePickerBtn)
          .eq(1)
          .click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.be.above(length);
        cy.get(rightSlider).click();
        cy.get(superTypePickerBtn)
          .eq(1)
          .click();
        cy.get(leftSlider).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(numCardsBeforeFilter).to.equal(length);
      });
  });

  it('should navigate between the tabs', function() {
    // make sure we're on the cards tab
    cy.get('[data-cy="tabButton"]:first').click();
    cy.get('[data-cy="tabButton"]')
      .eq(0)
      .should('have.class', 'selected');
    cy.get('[data-cy="deckBuilderMetaValue"]')
      .eq(0)
      .should('contain', 'No path selected');
    cy.get('[data-cy="deckBuilderMetaValue"]')
      .eq(1)
      .should('contain', 'No power selected');

    // go to path tab
    cy.get('[data-cy="editMetaValue"]:first').click();
    cy.get('[data-cy="tabButton"]')
      .eq(0)
      .should('not.have.class', 'selected');
    cy.get('[data-cy="tabButton"]')
      .eq(1)
      .should('have.class', 'selected');
    cy.get('[data-cy="tabButton"]')
      .eq(2)
      .should('not.have.class', 'selected');
    cy.get(`${cardListCard}:first`).click();
    cy.get('[data-cy="deckBuilderMetaValue"]')
      .eq(0)
      .should('not.contain', 'No path selected');

    // ho to power tab
    cy.get('[data-cy="tabButton"]:first').click(); // go back to cards tab
    cy.get('[data-cy="tabButton"]')
      .eq(0)
      .should('have.class', 'selected');
    cy.get('[data-cy="editMetaValue"]:last').click();
    cy.get('[data-cy="tabButton"]')
      .eq(0)
      .should('not.have.class', 'selected');
    cy.get('[data-cy="tabButton"]')
      .eq(1)
      .should('not.have.class', 'selected');
    cy.get('[data-cy="tabButton"]')
      .eq(2)
      .should('have.class', 'selected');
    cy.get(`${cardListCard}:first`).click();
    cy.get('[data-cy="deckBuilderMetaValue"]')
      .eq(0)
      .should('not.contain', 'No power selected');
  });

  it('should import a deck', function() {
    const input = [
      'name: my deck',
      'path: my path',
      'power: my power',
      'coverart: myself',
      '1 Dragon',
      '2 Imp',
      '5 Imp',
      '1 ghūl'
    ].join('\n');

    cy.get('[data-cy="goToImportMode"]').click();
    cy.get('[data-cy="importDeckTextarea"]').type(input);
    cy.get('[data-cy="importDeckButton"]').click();

    cy.get('[data-cy="deckTitle"]').should('have.value', 'my deck');
    cy.get(deckCardRow).should('have.length', 3);
  });

  it('should export a deck', function() {
    cy.on('window:confirm', () => {
      return true;
    });
    const input = [
      'name: my deck',
      'path: my path',
      'power: my power',
      'coverart: myself',
      '1 Dragon',
      '2 Imp'
    ].join('\n');

    // should be able to enter and exist import mode
    cy.get('[data-cy="goToImportMode"]').click();
    cy.get('[data-cy="importDeckTextarea"]').should('be.visible');
    cy.get('[data-cy="deckBuilderActions"]').should('not.be.visible');
    cy.get('[data-cy="cancelImportMode"]').click();
    cy.get('[data-cy="importDeckTextarea"]').should('not.be.visible');

    cy.get('[data-cy="goToImportMode"]').click();
    cy.get('[data-cy="importDeckTextarea"]').type(input);
    cy.get('[data-cy="importDeckButton"]').click();
    cy.get('[data-cy="exportDeckButton"]').click();

    cy.get('[data-cy="exportDeckSuccess"]').contains('Copied');
    cy.get('[data-cy="deckBuilderActions"]').should('be.visible');
  });

  it('should clear filters', function() {
    cy.get(cardSearchText).type('fur');
    cy.get(cardSearchText).should('have.value', 'fur');
    cy.get(factionFilter)
      .eq(0)
      .click();
    cy.get(`${factionFilter}.selected`).should('have.length', 1);
    cy.get(clearButton).click();
    cy.get(cardSearchText).should('have.value', '');
    cy.get(`${factionFilter}.selected`).should('have.length', 0);
  });
});
