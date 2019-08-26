import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeStateless } from '../lib/form-utils.js';
import CheckboxesInputGroup from './checkboxes-input-group.js';

const values = ['COMMON', 'UNCOMMON', 'RARE', 'MYTHIC'];
const labels = values.map(s => s.toLowerCase());
const name = 'rarity';

function RarityFilter({ onChange }) {
  return (
    <CheckboxesInputGroup
      onChange={onChange}
      values={values}
      labels={labels}
      name={name}
    />
  );
}

RarityFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RarityFilter;
