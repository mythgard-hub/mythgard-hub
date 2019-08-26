import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleInputChangeStateless } from '../lib/form-utils.js';

const OPTIONS_ENUM = ['0', '1', '2', '3', '4', '5', '6+'];
const flagsToEnums = flags =>
  flags.reduce((acc, isChecked, i) => {
    if (isChecked) {
      acc.push(OPTIONS_ENUM[i]);
    }
    return acc;
  }, []);

const labels = OPTIONS_ENUM.map(s => s.toLowerCase());

let previousFlags = OPTIONS_ENUM.map(() => false);

function ManaCostFilter({ onChange }) {
  const flagStateProps = OPTIONS_ENUM.map(() => useState(false));
  const flags = flagStateProps.map(a => a[0]);

  if (previousFlags.join() !== flags.join()) {
    onChange(flagsToEnums(flags));
  }

  previousFlags = [...flags];

  return (
    <div data-cy="cardSearchManaCost">
      {flagStateProps.map((a, i) => {
        const label = labels[i];
        return (
          <label key={i}>
            {label}
            <input
              type="checkbox"
              name={`manaCost_${label}`}
              value={a[0]}
              onChange={handleInputChangeStateless(a[1])}
            />
          </label>
        );
      })}
    </div>
  );
}

ManaCostFilter.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ManaCostFilter;
