import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function LargeTable(props) {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <style jsx>{`
        .mgLargeTable {
          width: 100%;
          border-collapse: collapse;
        }
        :global(.mgLargeTable > tbody > tr) {
          border-top: ${theme.border};
        }
        :global(.mgLargeTable > tbody > tr > td) {
          padding: 15px 10px 15px 10px;
        }
        :global(.mgLargeTable > tbody > tr > td) {
          text-align: center;
        }

        :global(.mgLargeTable > tbody > tr > td:first-of-type) {
          text-align: left;
        }
        :global(.mgLargeTable > tbody > tr > td:last-of-type) {
          text-align: right;
        }
        :global(.zebraRow) {
          background-color: ${theme.zebraRowBackground};
        }
        @media only screen and (max-width: 575.98px) {
          div {
            overflow: auto;
          }
        }
      `}</style>
      <table className="mgLargeTable">{props.children}</table>
    </div>
  );
}

LargeTable.propTypes = {
  children: PropTypes.any
};
