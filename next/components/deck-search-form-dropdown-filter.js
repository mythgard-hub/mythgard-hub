import React from 'react';
import PropTypes from 'prop-types';

export default function DeckSearchFormDropdownFilter(props) {
  const { label, options, onChange, filterValue } = props;

  return (
    <label className="input-label">
      {label}
      <br />
      <select
        className="filter-dropdown"
        data-cy={`deckSearch${label}`}
        value={filterValue}
        onChange={onChange}
      >
        <option key="any" value="">
          Any
        </option>
        {options.map(o => (
          <option key={o.label} value={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

DeckSearchFormDropdownFilter.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  filterValue: PropTypes.string,
  onChange: PropTypes.func
};
