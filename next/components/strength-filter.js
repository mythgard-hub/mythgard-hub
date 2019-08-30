import React from 'react';
import PropTypes from 'prop-types';
import CheckboxesInputGroup from './checkboxes-input-group.js';

const values = ['0', '1', '2', '3', '4', '5', '6+'];
const labels = [...values];
const name = 'strength';

function StrengthFilter({ onChange }) {
  return (
    <CheckboxesInputGroup
      onChange={onChange}
      values={values}
      labels={labels}
      name={name}
    />
  );
}

StrengthFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default StrengthFilter;
