import React from 'react';
import AllCards from '../components/all-cards';
import Layout from '../components/Layout';

function initializeImportedDeck() {
  return {
    deckName: '',
    deckPath: '',
    mainDeck: [],
    sideboard: [],
    errors: []
  };
}

function getImportErrors(mainDeckLines, sideboardLines) {
  const errors = [];

  // If we don't even have the first 3 lines, go home
  if (mainDeckLines.length < 3) {
    errors.push('Deck must have name, path and cards');
    return errors;
  }

  if (
    !mainDeckLines[0] ||
    !mainDeckLines[0][0] ||
    !mainDeckLines[0][0] === 'name' ||
    !mainDeckLines[0][1]
  ) {
    errors.push('Deck must have a name');
  }

  if (
    !mainDeckLines[1] ||
    !mainDeckLines[1][0] ||
    !mainDeckLines[1][0] === 'path' ||
    !mainDeckLines[1][1]
  ) {
    errors.push('Deck must have a path');
  }

  const cardLines = mainDeckLines.slice(2);

  if (cardLines.length <= 0) {
    errors.push('Deck must have cards');
  }

  const mainCorrectFormat = cardLines.reduce(
    (acc, curr) => acc && curr.size === 2,
    true
  );

  if (!mainCorrectFormat) {
    errors.push('Invalid input for main deck');
  }

  const sideCorrectFormat =
    sideboardLines.length === 0 ||
    sideboardLines.reduce((acc, curr) => acc && curr.size === 2, true);

  if (!sideCorrectFormat) {
    errors.push('Invalid input for sideboard');
  }

  return errors;
}

function convertImportToDeck(mainDeckText, sideboardText) {
  const importedDeck = initializeImportedDeck();

  if (!mainDeckText || !mainDeckText.split) {
    return importedDeck;
  }

  const mainDeckLines = mainDeckText.split(/\n/g).map(line => line.split(' '));
  const sideboardLines = sideboardText
    .split(/\n/g)
    .map(line => line.split(' '));

  importedDeck.errors = getImportErrors(mainDeckLines, sideboardLines);

  if (importedDeck.errors.length) {
    return importedDeck;
  }

  importedDeck.deckName = mainDeckLines[0][1];
  importedDeck.deckPath = mainDeckLines[1][1];
  importedDeck.mainDeck = mainDeckLines.slice(2);
  importedDeck.sideboard = sideboardLines;

  return importedDeck;
}

class DeckbuilderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainDeckInput: '',
      sideboardInput: '',
      importedDeck: initializeImportedDeck()
    };
  }

  render() {
    const {
      importedDeck: { deckName, deckPath, mainDeck, sideboard },
      mainDeckInput,
      sideboardInput
    } = this.state;

    return (
      <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
        <h1>Deck Builder</h1>
        <h2>Import Deck</h2>
        <h3>Main Deck</h3>
        <textarea
          columns="10"
          rows="10"
          value={mainDeckInput}
          onChange={e => {
            this.setState({
              mainDeckInput: e.target.value
            });
          }}
        />
        <h3>Sideboard</h3>
        <textarea
          columns="10"
          rows="5"
          value={sideboardInput}
          onChange={e => {
            this.setState({
              sideboardInput: e.target.value
            });
          }}
        />
        <br />
        <br />
        <button
          onClick={e => {
            e && e.preventDefault();
            this.setState({
              importedDeck: convertImportToDeck(mainDeckInput, sideboardInput)
            });
          }}
        >
          Import
        </button>
        <h2>Imported Deck</h2>
        <div>Name: {deckName}</div>
        <div>Path: {deckPath}</div>
        <h3>Main Board</h3>
        <div>{mainDeck}</div>
        <h3>Sideboard</h3>
        <div>{sideboard}</div>
        <h2>All Cards</h2>
        <AllCards />
      </Layout>
    );
  }
}

export default DeckbuilderPage;
