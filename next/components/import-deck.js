import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import cardsQuery from '../graphql/cardsQuery';
import { convertImportToDeck } from '../lib/import-utils';
import { addCardToDeck } from '../lib/deck-utils';

const handleImport = (
  mainDeckInput,
  currentMainDeck,
  updateImportedDeck,
  allCards
) => {
  const importedDeck = convertImportToDeck(mainDeckInput, '', allCards);

  // Upsert the previous cards to deck
  Object.values(currentMainDeck).forEach(card => {
    importedDeck.mainDeck = addCardToDeck(importedDeck.mainDeck, card);
  });

  updateImportedDeck(importedDeck);
};

export default function ImportDeck({
  mainDeckInput,
  currentMainDeck,
  handleInputChange,
  updateImportedDeck
}) {
  return (
    <Query query={cardsQuery}>
      {({ loading, error, data: { cards } }) => {
        if (error) return <ErrorMessage message={error} />;
        if (loading) return <div>Loading</div>;
        if (!cards.nodes) return <div>No cards in our database</div>;

        return (
          <>
            <h2 data-cy="importDeckTitle">Import Deck</h2>
            <textarea
              data-cy="importDeckTextarea"
              cols="40"
              rows="10"
              value={mainDeckInput}
              name="mainDeckInput"
              onChange={handleInputChange}
            />
            <br />
            <br />
            <button
              onClick={() =>
                handleImport(
                  mainDeckInput,
                  currentMainDeck,
                  updateImportedDeck,
                  cards.nodes
                )
              }
              data-cy="importDeckButton"
            >
              Import
            </button>
          </>
        );
      }}
    </Query>
  );
}

ImportDeck.defaultProps = {
  mainDeckInput: '',
  handleInputChange: () => {},
  updateImportedDeck: () => {}
};

ImportDeck.propTypes = {
  mainDeckInput: PropTypes.string,
  currentMainDeck: PropTypes.shape({
    quantity: PropTypes.number,
    card: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }),
  handleInputChange: PropTypes.func,
  updateImportedDeck: PropTypes.func
};
