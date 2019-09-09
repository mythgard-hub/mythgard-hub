import React from 'react';
import PropTypes from 'prop-types';
import ImageFilterGroup from './image-filter-group';
import { SUPERTYPE_IMAGES } from '../constants/supertypes';

const images = [
  {
    key: 'Minion',
    link: SUPERTYPE_IMAGES.minion
  },
  {
    key: 'Spell',
    link: SUPERTYPE_IMAGES.spell
  },
  {
    key: 'Enchantment',
    link: SUPERTYPE_IMAGES.enchantment
  },
  {
    key: 'Artifact',
    link: SUPERTYPE_IMAGES.artifact
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
