import React from 'react';
import PropTypes from 'prop-types';
import CheckboxesInputGroup from './checkboxes-input-group.js';

const values = ['Minion', 'Spell', 'Enchantment', 'Artifact', 'Item', 'Brand'];
const labels = [...values];
const name = 'supertype';

function SupertypeFilter({ onChange }) {
  return (
    <CheckboxesInputGroup
      onChange={onChange}
      values={values}
      labels={labels}
      name={name}
    />
  );
}

SupertypeFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SupertypeFilter;
