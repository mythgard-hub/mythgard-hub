import React from 'react';
import PropTypes from 'prop-types';
import ImageFilterGroup from './image-filter-group';
import { RARITY_IMAGES } from '../constants/rarities'

const cdn = process.env.MG_CDN;
const images = [
  {
    key: 'COMMON',
    link: RARITY_IMAGES.common
  },
  {
    key: 'UNCOMMON',
    link: RARITY_IMAGES.uncommon
  },
  {
    key: 'RARE',
    link: RARITY_IMAGES.rare
  },
  {
    key: 'MYTHIC',
    link: RARITY_IMAGES.mythic
  }
];

function RarityFilter({ selected, onChange, cyName }) {
  return (
    <ImageFilterGroup
      images={images}
      selected={selected}
      onChange={onChange}
      cyName={cyName}
    />
  );
}

RarityFilter.propTypes = {
  selected: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  cyName: PropTypes.string
};

export default RarityFilter;
