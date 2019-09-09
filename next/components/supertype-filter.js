import React from 'react';
import PropTypes from 'prop-types';
import ImageFilterGroup from './image-filter-group';

const cdn = process.env.MG_CDN;
const images = [
  {
    key: 'Minion',
    link: `${cdn}/filters/Filter-Icons_0000s_0004s_0000_minion.png`
  },
  {
    key: 'Spell',
    link: `${cdn}/filters/Filter-Icons_0000s_0004s_0001_spell.png`
  },
  {
    key: 'Enchantment',
    link: `${cdn}/filters/Filter-Icons_0000s_0004s_0002_enchantment.png`
  },
  {
    key: 'Artifact',
    link: `${cdn}/filters/Filter-Icons_0000s_0004s_0003_artifact.png`
  }
];

export default function SupertypeFilter({ selected, onChange, cyName }) {
  return (
    <ImageFilterGroup
      images={images}
      selected={selected}
      onChange={onChange}
      cyName={cyName}
    />
  );
}

SupertypeFilter.propTypes = {
  selected: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  cyName: PropTypes.string
};
