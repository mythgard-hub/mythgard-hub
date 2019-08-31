import {
  cardSearchText,
  cardSearchSubmit,
  factionFilter,
  cardListCard,
  superTypePicker,
  strengthPicker,
  defensePicker,
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
    cy.get(cardListCard)
      .then(({ length }) => {
        allCardsLength = length;
        cy.get(cardSearchText).type('fur');
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.be.below(allCardsLength);

        cy.get(cardSearchText).clear();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.equal(allCardsLength);

        cy.get(`${factionFilter}:first`).click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.be.below(allCardsLength);

        cy.get(`${factionFilter}:first`).click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.equal(allCardsLength);

        // basic test - supertype filter
        cy.get(`${superTypePicker} input:first`).click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.be.below(allCardsLength);

        cy.get(`${superTypePicker} input:first`).click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(({ length }) => {
        expect(length).to.equal(allCardsLength);

        // basic test - mana cost filter
        cy.get(`${manaPicker} input`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.be.above(cards.length);
        cy.get(`${manaPicker} input`)
          .eq(2)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.equal(cards.length);

        // basic test - strength filter
        cy.get(`${strengthPicker} input`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.be.above(cards.length);
        cy.get(`${strengthPicker} input`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.equal(cards.length);

        // basic test - defense filter
        cy.get(`${defensePicker} input`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.be.above(cards.length);
        cy.get(`${defensePicker} input`)
          .eq(1)
          .click();
        cy.get(cardSearchSubmit).click();
        return cy.get(cardListCard);
      })
      .then(cards => {
        expect(allCardsLength).to.equal(cards.length);
      });
  });
});
