import {
  cardSearchText,
  cardSearchSubmit,
  factionFilter,
  cardListCard,
  getPagingTotalAsInt,
  superTypePicker,
  strengthPicker,
  defensePicker,
  rarityPicker,
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
        expect(length).to.be.below(allCardsLength);

        cy.get(cardSearchText).clear();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(allCardsLength);

        cy.get(`${factionFilter}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(allCardsLength);

        cy.get(`${factionFilter}:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(allCardsLength);

        // basic test - supertype filter
        cy.get(`${superTypePicker} img:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.be.below(allCardsLength);

        cy.get(`${superTypePicker} img:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(length).to.equal(allCardsLength);

        // basic test - mana cost filter
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length);
        cy.get(`${manaPicker} img`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length);

        // basic test - strength filter
        cy.get(`${strengthPicker} img`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length);
        cy.get(`${strengthPicker} img`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length);

        // basic test - defense filter
        cy.get(`${defensePicker} img`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length);
        cy.get(`${defensePicker} img`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length);

        // basic test - rarity filter
        cy.get(`${rarityPicker} img:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length);
        cy.get(`${rarityPicker} img:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length);

        // basic test - clear filters
        cy.get(`${rarityPicker} img:first`).click();
        cy.get(`${superTypePicker} img:first`).click();
        cy.get(cardSearchSubmit).click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.be.above(length);
        cy.get('[data-cy="cardSearchClear"]').click();
        return getPagingTotalAsInt();
      })
      .then(length => {
        expect(allCardsLength).to.equal(length);
        cy.get(`${rarityPicker} img:first`).should(
          'not.have.class',
          'selected'
        );
        cy.get(`${superTypePicker} img:first`).should(
          'not.have.class',
          'selected'
        );
      });
  });
});
