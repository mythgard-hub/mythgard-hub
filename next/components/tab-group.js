import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

function TabGroup({ name, labels, selectedLabel, onChange }) {
  const theme = useContext(ThemeContext);

  return (
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

        @media only screen and (max-width: 575.98px) {
          .tab {
            min-width: 75px;
          }
        }
      `}</style>
      <div className="tab-spacer"></div>
      {labels.map((label, i) => {
        const selectedClass = label == selectedLabel ? 'selected' : '';
        return (
          <React.Fragment key={i}>
            <button
              className={`tab reset-button ${selectedClass}`}
              data-cy="tabButton"
              onClick={() => onChange(label)}
            >
              {label}
            </button>
            <div className="tab-spacer"></div>
          </React.Fragment>
        );
      })}
      <div className="tab-spacer"></div>
    </div>
  );
}

TabGroup.propTypes = {
  selectedLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired
};

export default TabGroup;
