import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TabGroup({ onChange, name, labels }) {
  const [selectedLabel, setLabel] = useState(labels[0]);

  useEffect(() => onChange(selectedLabel));

  return (
    <div data-cy={`tabs_${name}`}>
      <style jsx>{`
        display: flex;
        flex-wrap: none;
        border-bottom: 1px solid orange;
        .tab {
        }
        .tab-spacer {
          min-width: 20px;
        }
      `}</style>
      <div className="tab-spacer"></div>
      {labels.map((label, i) => {
        return (
          <>
            <button
              name={`${label} tab`}
              key={2 * i}
              className="tab reset-button"
              onClick={() => setLabel(label)}
            >
              {label}
            </button>
            <div key={2 * i + 1} className="tab-spacer"></div>
          </>
        );
      })}
      <div className="tab-spacer"></div>
    </div>
  );
}

TabGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired
};

export default TabGroup;
