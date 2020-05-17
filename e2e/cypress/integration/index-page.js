import { deckPreview } from '../page-objects/all.js';
describe('Index Page', function() {
  beforeEach(() => {
    cy.visit('/');
  });
  it('home page', function() {
    cy.get(`[data-cy=topDecks] ${deckPreview}`).should('have.length', 1);
    cy.get(`[data-cy=newestDecks] ${deckPreview}`).should('have.length', 4);
  });
});
