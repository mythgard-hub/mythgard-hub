import {
  cardSearchText,
  cardSearchSubmit,
  factionFilter,
  cardListCard
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
      });
  });
});
