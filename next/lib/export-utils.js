export const exportDeck = deckInProgress => {
  try {
    const exportMeta = [
      `name: ${deckInProgress.deckName}`,
      `path: ${deckInProgress.deckPath.name}`,
      `power: ${deckInProgress.deckPower.name}`,
      `coverart: ${deckInProgress.deckCoverArt}`
    ].join('\n');

    const cards = Object.values(deckInProgress.mainDeck)
      .map(c => {
        const quantity = c.quantity || '1';
        const name = (c && c.card && c.card.name) || '';
        return `${quantity} ${name}`;
      })
      .join('\n');

    const all = [exportMeta, cards];

    return all.join('\n');
  } catch (e) {
    return '';
  }
};
