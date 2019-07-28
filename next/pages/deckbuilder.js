import React from 'react';
import AllCards from '../components/all-cards';
import Layout from '../components/Layout';
import ImportedDeck from '../components/imported-deck';
import { getImportErrors, formatCardLines } from '../lib/import-utils';
import { handleInputChange } from '../lib/form-utils';

function initializeImportedDeck() {
  return {
    deckName: '',
    deckPath: '',
    mainDeck: [],
    sideboard: [],
    errors: []
  };
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
  importedDeck.mainDeck = formatCardLines(mainDeckLines.slice(3));
  importedDeck.sideboard = formatCardLines(sideboardLines);

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

    this.handleInputChange = handleInputChange.bind(this);
  }

  render() {
    const { importedDeck, mainDeckInput, sideboardInput } = this.state;

    return (
      <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
        <h1>Deck Builder</h1>
        <h2>Import Deck</h2>
        <h3>Main Deck</h3>
        <textarea
          columns="20"
          rows="10"
          value={mainDeckInput}
          name="mainDeckInput"
          onChange={this.handleInputChange}
        />
        <h3>Sideboard</h3>
        <textarea
          columns="20"
          rows="5"
          value={sideboardInput}
          name="sideboardInput"
          onChange={this.handleInputChange}
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
        <ImportedDeck importedDeck={importedDeck} />
        <h2>All Cards</h2>
        <AllCards />
      </Layout>
    );
  }
}

export default DeckbuilderPage;
