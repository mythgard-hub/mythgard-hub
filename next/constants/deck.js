const icons = `${process.env.MG_CDN}/icons/`;

export const DECK_ICONS = {
  upvote: `${icons}upVoteButton.svg`
};

export const META_KEYS = {
  NAME: 'name',
  PATH: 'path',
  POWER: 'power',
  COVER_ART: 'coverart'
};

export const DECK_SIZES = {
  MIN: 40,
  MAX: 200
};

export const DECK_BUILDER_TABS = ['Cards', 'Paths', 'Powers'];

export const TYPES = [
  { value: ['STANDARD'], label: 'Standard' },
  { value: ['GAUNTLET'], label: 'Gauntlet' },
  { value: ['ARENA'], label: 'Arena' },
  { value: ['TOURNAMENT'], label: 'Tournament' },
  { value: ['TWOVTWO'], label: '2v2' }
];

export const ARCHETYPES = [
  { value: ['UNKNOWN'], label: 'Unknown' },
  { value: ['AGGRO'], label: 'Aggro' },
  { value: ['AGGRO', 'MIDRANGE'], label: 'Aggro Midrange' },
  { value: ['MIDRANGE'], label: 'Midrange' },
  { value: ['CONTROL', 'MIDRANGE'], label: 'Control Midrange' },
  { value: ['CONTROL'], label: 'Control' },
  { value: ['COMBO'], label: 'Combo' }
];
