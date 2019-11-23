import React from 'react';
import PropTypes from 'prop-types';

export default function DeckSearchFormDropdownFilter(props) {
  const { label, options, onChange, filterValue } = props;

  return (
    <label className="input-label">
      <style jsx>{``}</style>
      {label}
      <br />
      <select
        className="filter-dropdown"
        value={filterValue}
        onChange={onChange}
      >
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
