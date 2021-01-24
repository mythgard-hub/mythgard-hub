import { handleInputChangeHooks } from '../lib/form-utils.js';
import { useState } from 'react';

function ModEditCards() {
  const [cardImportText, setCardImportText] = useState(`Id	Name	Faction
323	Temple at Delphi	Oberos
329	Melinoe, Soul Shepherd	Oberos`);
  const rows = cardImportText.split('\n');
  const splitRows = rows.map(s => s.split('\t'));
  const headers = splitRows[0];
  console.log(headers);
  return (
    <div>
      <h1>Card Updater</h1>
      <p>
        Import cards as tab separated values (can by copied from google sheet).
        Must include header. Column order does not matter. See prefilled
        example:
      </p>
      <textarea
        className="import-deck-textarea"
        data-cy="importDeckTextarea"
        cols="120"
        rows="30"
        value={cardImportText}
        name="cardsInput"
        onChange={handleInputChangeHooks(setCardImportText)}
        placeholder="Paste in cards to update"
      />
    </div>
  );
}

export default ModEditCards;
