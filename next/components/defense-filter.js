import React from 'react';
import PropTypes from 'prop-types';
import CheckboxesInputGroup from './checkboxes-input-group.js';

const values = ['0', '1', '2', '3', '4', '5', '6+'];
const labels = [...values];
const name = 'defense';

function DefenseFilter({ onChange }) {
  return (
    <CheckboxesInputGroup
      onChange={onChange}
      values={values}
      labels={labels}
      name={name}
    />
  );
}

DefenseFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default DefenseFilter;
