import PropTypes from 'prop-types';
import { ThemeContext } from '../components/theme-context.js';
import { useContext } from 'react';
export default function MultiColumn({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <div className="multiColumns">
      <style jsx>{`
        .multiColumns {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 10px 0;
        }

        :global(.mg-column + .mg-column) {
          margin-left: ${theme.spacing * 2}px;
        }

        :global(.mg-column) {
          flex: 1;
        }

        .multiColumns :global(h2) {
          text-align: center;
          font-size: 1.2em;
          font-weight: 700;
          font-style: italic;
          text-transform: uppercase;
        }
        @media only screen and (max-width: 575.98px) {
          :global(.mg-column) {
            width: 100%;
            flex: none;
          }

          :global(.mg-column + .mg-column) {
            margin-left: 0;
          }
        }
      `}</style>
      {children}
    </div>
  );
}

MultiColumn.propTypes = {
  children: PropTypes.any
};
