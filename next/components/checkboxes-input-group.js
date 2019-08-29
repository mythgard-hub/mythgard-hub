import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';

const flagsToValues = (flags, values) =>
  flags.reduce((acc, isChecked, i) => {
    if (isChecked) {
      acc.push(values[i]);
    }
    return acc;
  }, []);

function CheckboxesInputGroup({ onChange, name, labels, values }) {
  const flagStateProps = values.map(() => useState(false));
  const flags = flagStateProps.map(a => a[0]);

  useEffect(() => onChange(flagsToValues(flags, values)), flags);

  return (
    <div data-cy={`cardSearch_${name}`}>
      {flagStateProps.map(([value, setter], i) => {
        const label = labels[i];
        return (
          <label key={i}>
            {label}
            <input
              type="checkbox"
              name={`${name}_${label}`}
              value={value}
              onChange={handleInputChangeHooks(setter)}
            />
          </label>
        );
      })}
    </div>
  );
}

CheckboxesInputGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired
};

export default CheckboxesInputGroup;
