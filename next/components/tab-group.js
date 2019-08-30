import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TabGroup({ onChange, name, labels }) {
  const [selectedLabel, setLabel] = useState(labels[0]);

  useEffect(() => onChange(selectedLabel));

  return (
    <div className="mg-tab-group" data-cy={`tabs_${name}`}>
      <style jsx>{`
        .mg-tab-group {
          display: flex;
          flex-wrap: nowrap;
          font-size: 11px;
        }
        .tab {
          padding: 5px;
          border: 1px solid #458a9e;
          background-color: #11222a;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          color: #458a9e;
          min-width: 100px;
          text-align: center;
          height: 30px;
        }
        .tab-spacer {
          border-bottom: 1px solid #458a9e;
          min-width: 15px;
        }
        .tab.selected {
          border-bottom: none;
        }
        .tab-spacer:last-of-type {
          border-bottom: 1px solid #458a9e;
          min-width: 10px;
          flex-grow: 1;
        }
      `}</style>
      <div className="tab-spacer"></div>
      {labels.map((label, i) => {
        return (
          <>
            <button
              key={2 * i}
              className={`tab reset-button ${
                label == selectedLabel ? 'selected' : ''
              }`}
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
