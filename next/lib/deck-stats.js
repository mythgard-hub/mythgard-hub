export const getManaCurve = cards => {
  const manaCosts = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6+': 0
  };

  try {
    Object.values(cards).forEach(card => {
      const manaCost = card.card.mana >= 6 ? '6+' : card.card.mana.toString();
      manaCosts[manaCost] += card.quantity;
    });
  } catch (e) {
    console.error(e);
  }

  return Object.values(manaCosts);
};
