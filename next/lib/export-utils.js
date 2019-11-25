export const exportDeck = deckInProgress => {
  try {
    const path =
      deckInProgress.deckPath && deckInProgress.deckPath.name
        ? deckInProgress.deckPath.name
        : '';
    const power =
      deckInProgress.deckPower && deckInProgress.deckPower.name
        ? deckInProgress.deckPower.name
        : '';
    const exportMeta = [
      `name: ${deckInProgress.deckName}`,
      `path: ${path}`,
      `power: ${power}`,
      `coverart: ${deckInProgress.deckCoverArt || ''}`
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
