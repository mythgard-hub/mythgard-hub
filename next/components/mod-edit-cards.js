import { handleInputChangeHooks } from '../lib/form-utils.js';
import { useState } from 'react';

function ModEditCards() {
  // const [cardImportText, setCardImportText] = useState(`Id	Name	Faction
  // 323	Temple at Delphi	Oberos
  // 329	Melinoe, Soul Shepherd	Oberos`);
  const [
    cardImportText,
    setCardImportText
  ] = useState(`1	Clay Effigy	Aztlan		Spell	Earth Spell	1	Y	Rare			Create a 0/1 Statue in any player's unoccupied lane and draw a card. 					451
2	Foul Harvest 	Aztlan		Spell	Ritual Spell	1	Y	Common			Sacrifice one of your minions to gain 4 life and (3) temporary mana. 					`);
  const rows = cardImportText.split('\n');
  const splitRows = rows.map(s => s.split('\t'));
  // console.log(JSON.stringify(splitRows));
  const cols = 'id, name, facOne, facTwo, supertype, subtype, manaCost, gemCost, rarity, atk, def, rules, flavor, cardset, spawnonly, artist, spawns'.split(
    ', '
  );
  let error = '';
  let cards = splitRows.map(row => {
    const card = {};
    row.forEach((value, i) => (card[cols[i]] = value.trim()));
    return card;
  });
  const setDefaultSet = card => {
    card.cardset = card.cardset || 'Core';
    return card;
  };
  const formatSupertype = card => {
    card.supertype = card.supertype.split(',').map(s => s.toUpperCase());
    return card;
  };
  const formatAtkAndDef = card => {
    card.atk = card.atk ? parseInt(card.atk, 10) : null;
    card.def = card.def ? parseInt(card.def, 10) : null;
    const checkInt = (c, t) => c[t] !== null && isNaN(c[t]);
    if (checkInt(card, 'atk')) {
      error = `${card.name} has invalid atk`;
    }
    if (checkInt(card, 'def')) {
      error = `${card.name} has invalid def`;
    }
    return card;
  };
  cards = cards.map(setDefaultSet);
  cards = cards.map(formatSupertype);
  cards = cards.map(formatAtkAndDef);
  console.log('cards: ', cards);
  // const cards = [];
  // const addId = card, i => card.id =
  // const processors = {
  //   id: addId
  // };
  //
  // Import cards as tab separated values (can by copied from google sheet).
  // Must include header. Column order does not matter. See prefilled
  // example:
  return (
    <div>
      <h1>Card Updater</h1>
      <p>
        Import cards as tab separated values. It will be easiest to just
        copy/paste the google sheet. See prefilled example:
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        wrap="off"
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
