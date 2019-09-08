import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function CardSearchSuggestion({ suggestion }) {
  const theme = useContext(ThemeContext);

  return (
    <div className="cardSearchItem">
      <style jsx>{`
        .cardSearchItem {
          cursor: pointer;
          marging-bottom: 10px;
        }
        .cardSearchItem:hover {
          color: ${theme.hoverColor};
        }
      `}</style>
      {suggestion.name}
    </div>
  );
}

CardSearchSuggestion.propTypes = {
  suggestion: PropTypes.string
};
