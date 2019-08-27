import React from 'react';
import PropTypes from 'prop-types';
import CheckboxesInputGroup from './checkboxes-input-group.js';

const values = ['0', '1', '2', '3', '4', '5', '6+'];
const labels = [...values];
const name = 'manaCost';

function ManaCostFilter({ onChange }) {
  return (
    <CheckboxesInputGroup
      onChange={onChange}
      values={values}
      labels={labels}
      name={name}
    />
  );
}

ManaCostFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ManaCostFilter;
