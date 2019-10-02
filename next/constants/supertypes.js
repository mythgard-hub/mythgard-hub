const cdn = `${process.env.MG_CDN}/filters/`;

export const SUPERTYPES = {
  minion: 'MINION',
  spell: 'SPELL',
  enchantment: 'ENCHANTMENT',
  artifact: 'ARTIFACT'
};

export const SUPERTYPE_IMAGES = {
  minion: `${cdn}Filter-Icons_0000s_0004s_0000_minion.png`,
  spell: `${cdn}Filter-Icons_0000s_0004s_0001_spell.png`,
  enchantment: `${cdn}Filter-Icons_0000s_0004s_0002_enchantment.png`,
  artifact: `${cdn}Filter-Icons_0000s_0004s_0003_artifact.png`
};
