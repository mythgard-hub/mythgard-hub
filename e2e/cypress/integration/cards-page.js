import {
  cardSearchText,
  cardSearchSubmit,
  factionFilter,
  getPagingTotalAsInt,
  superTypePickerBtn,
  strengthPicker,
  defensePickerBtn,
  rarityPickerBtn,
  manaPicker
} from '../page-objects/all.js';
describe('Cards Page', function() {
  beforeEach(() => {
    cy.visit('/cards');
  });
  it('works', function() {
    cy.get('ul.cardList li').should('be.visible');
    cy.get('ul.cardList a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/card');
    });
    cy.get('h1').should('have.class', 'cardName');
  });
  it('filters cards', function() {
    cy.get(cardSearchSubmit).click();
    let allCardsLength;
    getPagingTotalAsInt()
      .then(length => {
        allCardsLength = length;
        cy.get(cardSearchText).type('fur');
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(allCardsLength, 'search text filter works');

        cy.get(cardSearchText).clear();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        allCardsLength = length;
        cy.get(cardSearchText).type('drag{enter}');
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(
          allCardsLength,
          'search submits when pressing enter'
        );

        cy.get(cardSearchText).clear();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(allCardsLength, 'clearing text search works');

        cy.get(`${factionFilter}:first`).click({ force: true });
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(allCardsLength, 'faction filter works');

        cy.get(`${factionFilter}:first`).click({ force: true });
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(
          allCardsLength,
          'clearing faction filter works'
        );

        // basic test - supertype filter
        cy.get(`${superTypePickerBtn}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(allCardsLength, 'supertype picker works');

        cy.get(`${superTypePickerBtn}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(
          allCardsLength,
          'clearing supertype picker works'
        );

        // basic test - mana cost filter
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length, 'mana picker works');
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length, 'clearing mana filter works');

        // basic test - strength filter
        cy.get(`${strengthPicker} img`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length, 'str filter works');
        cy.get(`${strengthPicker} img`)
          .eq(1)
          .click({ force: true });
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length, 'clearing mana filter works');

        // basic test - defense filter
        cy.get(defensePickerBtn)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length, 'defense filter works');
        cy.get(defensePickerBtn)
          .eq(1)
          .click({ force: true });
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length, 'clearing def filter works');

        // basic test - rarity filter
        cy.get(`${rarityPickerBtn}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length, 'rarity filter works');
        cy.get(`${rarityPickerBtn}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length, 'clearing rarity filter works');

        // basic test - clear filters
        cy.get(`${rarityPickerBtn}:first`).click();
        cy.get(`${superTypePickerBtn}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(
          length,
          'setup for clear button test'
        );
        cy.get('[data-cy="cardSearchClear"]').click();
        cy.wait(500);
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length, 'clear button works');
        cy.get(`${rarityPickerBtn}:first`).should('not.have.class', 'selected');
        cy.get(`${superTypePickerBtn}:first`).should(
          'not.have.class',
          'selected'
        );
      });
  });
});
