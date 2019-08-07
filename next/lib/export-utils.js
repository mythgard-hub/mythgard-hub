export const exportDeck = deckInProgress => {
  try {
    const exportMeta = [
      `name: ${deckInProgress.deckName}`,
      `path: ${deckInProgress.deckPath}`,
      `power: ${deckInProgress.deckPower}`,
      `coverart: ${deckInProgress.deckCoverArt}`
    ].join('\n');

    const cards = Object.values(deckInProgress.mainDeck)
      .map(c => {
        const quantity = c.quantity || '1';
        return `${quantity} ${c.name}`;
      })
      .join('\n');

    const all = [exportMeta, cards];

    return all.join('\n');
  } catch (e) {
    return '';
  }
};
