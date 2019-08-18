import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';

import pathsAndPowersQuery from '../lib/queries/paths-powers-query';
import allCardsQuery from '../lib/queries/all-cards-query';
import { convertImportToDeck } from '../lib/import-utils';
import { addCardToDeck } from '../lib/deck-utils';

const handleImport = (
  mainDeckInput,
  currentMainDeck,
  updateImportedDeck,
  allCards,
  allPaths,
  allPowers
) => {
  const importedDeck = convertImportToDeck(
    mainDeckInput,
    '',
    allCards,
    allPaths,
    allPowers
  );

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
  const { loading: cLoading, error: cError, data: cData } = useQuery(
    allCardsQuery
  );
  const { loading: pLoading, error: pError, data: pData } = useQuery(
    pathsAndPowersQuery
  );

  if (cError || pError) return <ErrorMessage message={error} />;
  if (cLoading || pLoading) return <div>Loading</div>;

  const cards = cData && cData.cards && cData.cards.nodes;
  const paths = pData && pData.paths && pData.paths.nodes;
  const powers = pData && pData.powers && pData.powers.nodes;

  if (!cards) return <div>No cards in our database</div>;
  if (!paths) return <div>No paths in our database</div>;
  if (!powers) return <div>No powers in our database</div>;

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
            cards,
            paths,
            powers
          )
        }
        data-cy="importDeckButton"
      >
        Import
      </button>
    </>
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
