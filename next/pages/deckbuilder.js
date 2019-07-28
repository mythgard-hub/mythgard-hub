import React from 'react';
import AllCards from '../components/all-cards';
import Layout from '../components/Layout';
import ImportedDeck from '../components/imported-deck';
import {
  getImportErrors,
  formatCardLines,
  extractMetaValue
} from '../lib/import-utils';
import { handleInputChange } from '../lib/form-utils';
import DeckExport from '../components/deck-export';

const initializeImportedDeck = () => {
  return {
    deckName: '',
    deckPath: '',
    deckPower: '',
    mainDeck: [],
    sideboard: [],
    errors: [],
    asText: ''
  };
};

const convertImportToDeck = (mainDeckText, sideboardText) => {
  const importedDeck = initializeImportedDeck();

  importedDeck.errors = getImportErrors(mainDeckText, sideboardText);

  if (importedDeck.errors.length) {
    return importedDeck;
  }

  const mainDeckLines = mainDeckText.split(/\n/g);
  const sideboardLines = sideboardText.split(/\n/g);

  importedDeck.deckName = extractMetaValue(mainDeckLines[0]);
  importedDeck.deckPath = extractMetaValue(mainDeckLines[1]);
  importedDeck.deckPower = extractMetaValue(mainDeckLines[2]);
  importedDeck.mainDeck = formatCardLines(mainDeckLines.slice(3));
  importedDeck.sideboard = formatCardLines(sideboardLines);
  importedDeck.asText = mainDeckText;

  return importedDeck;
};

class DeckbuilderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainDeckInput: '',
      sideboardInput: '',
      importedDeck: initializeImportedDeck()
    };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleImport() {
    const { mainDeckInput, sideboardInput } = this.state;
    this.setState({
      importedDeck: convertImportToDeck(mainDeckInput, sideboardInput)
    });
  }

  render() {
    const { importedDeck, mainDeckInput, sideboardInput } = this.state;

    return (
      <Layout title="Mythgard Hub | Decks" desc="Browse Mythgard decks">
        <h1>Deck Builder</h1>
        <h2>Import Deck</h2>
        <h3>Main Deck</h3>
        <textarea
          cols="40"
          rows="10"
          value={mainDeckInput}
          name="mainDeckInput"
          onChange={this.handleInputChange}
        />
        <h3>Sideboard</h3>
        <textarea
          cols="40"
          rows="5"
          value={sideboardInput}
          name="sideboardInput"
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        <button onClick={this.handleImport}>Import</button>
        &nbsp;
        <DeckExport textToExport={importedDeck.asText} />
        <ImportedDeck importedDeck={importedDeck} />
        <h2>All Cards</h2>
        <AllCards />
      </Layout>
    );
  }
}

export default DeckbuilderPage;
