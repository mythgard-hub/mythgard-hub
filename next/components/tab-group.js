import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

function TabGroup({ onChange, name, labels }) {
  const [selectedLabel, setLabel] = useState(labels[0]);

  useEffect(() => onChange(selectedLabel));

  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className="mg-tab-group" data-cy={`tabs_${name}`}>
          <style jsx>{`
            .mg-tab-group {
              display: flex;
              flex-wrap: nowrap;
              font-size: 11px;
            }
            .tab {
              border: ${theme.tabBorder};
              border-bottom-left-radius: 0px;
              border-bottom-right-radius: 0px;
              color: ${theme.tabColor};
              min-width: 100px;
              padding: 0 5px;
              text-align: center;
              height: 30px;
            }
            .tab.selected {
              border-bottom: none;
            }
            .tab:hover {
              background-color: ${theme.backgroundLight};
            }
            .tab-spacer {
              border-bottom: ${theme.tabBorder};
              min-width: 15px;
            }
            .tab-spacer:last-of-type {
              flex-grow: 1;
            }
          `}</style>
          <div className="tab-spacer"></div>
          {labels.map((label, i) => {
            const selectedClass = label == selectedLabel ? 'selected' : '';
            return (
              <React.Fragment key={i}>
                <button
                  className={`tab reset-button ${selectedClass}`}
                  onClick={() => setLabel(label)}
                >
                  {label}
                </button>
                <div className="tab-spacer"></div>
              </React.Fragment>
            );
          })}
          <div className="tab-spacer"></div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

TabGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired
};

export default TabGroup;
