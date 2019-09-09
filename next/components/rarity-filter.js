import React from 'react';
import PropTypes from 'prop-types';
import ImageFilterGroup from './image-filter-group';

const cdn = process.env.MG_CDN;
const images = [
  {
    key: 'COMMON',
    link: `${cdn}/filters/Filter-Icons_0000s_0000s_0000_C.png`
  },
  {
    key: 'UNCOMMON',
    link: `${cdn}/filters/Filter-Icons_0000s_0000s_0001_U.png`
  },
  {
    key: 'RARE',
    link: `${cdn}/filters/Filter-Icons_0000s_0000s_0002_R.png`
  },
  {
    key: 'MYTHIC',
    link: `${cdn}/filters/Filter-Icons_0000s_0000s_0003_M.png`
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
