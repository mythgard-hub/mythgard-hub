import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeStateless } from '../lib/form-utils.js';

const flagsToValues = (flags, values) =>
  flags.reduce((acc, isChecked, i) => {
    if (isChecked) {
      acc.push(values[i]);
    }
    return acc;
  }, []);

let previousFlags;

function CheckboxesInputGroup({ onChange, name, labels, values }) {
  previousFlags = previousFlags || values.map(() => false);
  const flagStateProps = values.map(() => useState(false));
  const flags = flagStateProps.map(a => a[0]);

  if (previousFlags.join() !== flags.join()) {
    onChange(flagsToValues(flags, values));
  }

  previousFlags = [...flags];

  return (
    <div data-cy={`cardSearch_${name}`}>
      {flagStateProps.map((a, i) => {
        const label = labels[i];
        return (
          <label key={i}>
            {label}
            <input
              type="checkbox"
              name={`${name}_${label}`}
              value={a[0]}
              onChange={handleInputChangeStateless(a[1])}
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
