import {
  cardSearch,
  cardSelectionItem,
  factionFilter,
  deckName,
  deckFactionsPicker,
  deckEssencePicker
} from '../page-objects/all';

const cardSearchSelections = `${cardSearch} ${cardSelectionItem}`;

describe('Decks Page', function() {
  beforeEach(() => {
    cy.visit('/decks');
  });
  it('works', function() {
    cy.get('[data-cy="deckListItem"] a:first').click();
    cy.location().should(location => {
      expect(location.pathname).to.eq('/deck', 'links to decks work');
    });
    cy.get(deckName).should('have.length', 1);
  });

  it('should search for decks', function() {
    cy.get('[data-cy="deckListItem"]').then(list => {
      // test deck name search - submit by clicking the submit button
      const initialListLength = list.length;
      cy.get('[data-cy="deckSearchDeckName"]').type('cat');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
      cy.get(deckFactionsPicker).should('have.length', '1');
      cy.get(deckEssencePicker).should('contain', '50');
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - submit on enter
      cy.get('[data-cy="deckSearchDeckName"]').type('cat{enter}');
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
      cy.get(deckFactionsPicker).should('have.length', '1');
      cy.get(deckEssencePicker).should('contain', '50');
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test search by card name included
      let lengthAfterOneFilter;
      cy.get(`${cardSearch} input`).type('drag');
      cy.get(`${cardSearch} input`).type('{enter}');
      cy.get(cardSearchSelections).should('have.length', 1);
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.wait(500);
      cy.get('[data-cy="deckListItem"]')
        .then(cards => {
          lengthAfterOneFilter = cards.length;
          expect(lengthAfterOneFilter).to.be.lessThan(
            initialListLength,
            'filter by card name works'
          );
          cy.get(`${cardSearch} input`).type('harm');
          cy.get(`${cardSearch} input`).type('{enter}');
          cy.get(cardSearchSelections).should('have.length', 2);
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            lengthAfterOneFilter,
            'filter by card name - another card'
          );
        })
        .then(() => {
          cy.get(`${cardSearchSelections} button`).should('have.length', 2);
          cy.get(deckFactionsPicker).should('have.length', '6');
          cy.get(deckEssencePicker).should('contain', '3150');
          cy.get(`${cardSearchSelections} button`).click({ multiple: true });
          cy.get(cardSearchSelections).should('have.length', 0);
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck faction search
          cy.get(`${factionFilter}:first`).click();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            initialListLength,
            'faction search works'
          );
          cy.get(`${factionFilter}:first`).click();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck author search - submit by clicking the submit button
          cy.get('[data-cy="deckSearchDeckAuthor"]').type('lsv');
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            initialListLength,
            'author search works'
          );
          cy.get('[data-cy="deckSearchDeckAuthor"]').clear();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck author search - submit by pressing enter
          cy.get('[data-cy="deckSearchDeckAuthor"]').type('lsv{enter}');
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(initialListLength);
          cy.get('[data-cy="deckSearchDeckAuthor"]').clear();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );
        });
    });
  });

  it('should search for decks with multiple words', function() {
    cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    cy.get('[data-cy="deckSearchSubmit"]').click();
    cy.get('[data-cy="deckListItem"]').then(list => {
      
      const initialListLength = list.length;

      // test deck name search - full name with spaces
      cy.get('[data-cy="deckSearchDeckName"]').type('norden aztlan');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - first full word and start of the second
      cy.get('[data-cy="deckSearchDeckName"]').type('norden azt');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - start of the first word and full second word
      cy.get('[data-cy="deckSearchDeckName"]').type('nor aztlan');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - start of both words
      cy.get('[data-cy="deckSearchDeckName"]').type('nor azt');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - full name with spaces (multiple spaces)
      cy.get('[data-cy="deckSearchDeckName"]').type(' nor   azt ');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - first full word and start of the second (multiple spaces)
      cy.get('[data-cy="deckSearchDeckName"]').type(' norden azt ');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - start of the first word and full second word (multiple spaces)
      cy.get('[data-cy="deckSearchDeckName"]').type('  nor  aztlan  ');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test deck name search - start of both words (multiple spaces)
      cy.get('[data-cy="deckSearchDeckName"]').type('  nor  azt   ');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'norden aztlan');      
      cy.get('[data-cy="deckSearchDeckName"]').clear();
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );
      
    });
  });

  it('should search for decks and clear filters', function() {
    cy.get('[data-cy="deckSearchUpdatedTime"]').select('100000');
    cy.get('[data-cy="deckListItem"]').then(list => {
      // test deck name search
      const initialListLength = list.length;
      cy.get('[data-cy="deckSearchDeckName"]').type('cat');
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.get('[data-cy="deckListItem"]').should('have.length', 1);
      cy.get('[data-cy="deckListItem"] a').should('contain', 'cat');
      cy.get(deckFactionsPicker).should('have.length', '1');
      cy.get(deckEssencePicker).should('contain', '50');
      cy.get('[data-cy="deckSearchClear"]').click();
      cy.get('[data-cy="deckListItem"]').should(
        'have.length',
        initialListLength
      );

      // test search by card name included
      let lengthAfterOneFilter;
      cy.get(`${cardSearch} input`).type('drag');
      cy.get(`${cardSearch} input`).type('{enter}');
      cy.get(cardSearchSelections).should('have.length', 1);
      cy.get('[data-cy="deckSearchSubmit"]').click();
      cy.wait(500);
      cy.get('[data-cy="deckListItem"]')
        .then(cards => {
          lengthAfterOneFilter = cards.length;
          expect(lengthAfterOneFilter).to.be.lessThan(
            initialListLength,
            'filter by card name'
          );
          cy.get(`${cardSearch} input`).type('harm');
          cy.get(`${cardSearch} input`).type('{enter}');
          cy.get(cardSearchSelections).should('have.length', 2);
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            lengthAfterOneFilter,
            'filter by another card name'
          );
        })
        .then(() => {
          cy.get(`${cardSearchSelections} button`).should('have.length', 2);
          cy.get(deckFactionsPicker).should('have.length', '6');
          cy.get(deckEssencePicker).should('contain', '3150');
          cy.get('[data-cy="deckSearchClear"]').click();
          cy.get(cardSearchSelections).should('have.length', 0);
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck faction search
          cy.get(`${factionFilter}:first`).click();
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            initialListLength,
            'filter by factions'
          );
          cy.get('[data-cy="deckSearchClear"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );

          // test deck author search
          cy.get('[data-cy="deckSearchDeckAuthor"]').type('lsv');
          cy.get('[data-cy="deckSearchSubmit"]').click();
          cy.wait(500);
          return cy.get('[data-cy="deckListItem"]');
        })
        .then(cards => {
          expect(cards.length).to.be.lessThan(
            initialListLength,
            'filter by author'
          );
          cy.get('[data-cy="deckSearchClear"]').click();
          cy.get('[data-cy="deckListItem"]').should(
            'have.length',
            initialListLength
          );
        });
    });
  });
});
