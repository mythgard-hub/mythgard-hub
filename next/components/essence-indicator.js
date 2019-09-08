import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

// TODO - this is actually an essence indicator
export default function EssenceIndicator({ essence }) {
  const theme = useContext(ThemeContext);
  const iconUrl = `${process.env.MG_CDN}/filters/essence.png`;

  return (
    <span className="essenceIndicator">
      <style jsx>{`
        color: ${theme.essenceColor};
        font-weight: bold;
        font-size: 18px;
        img {
          max-height: 12px;
          margin-right: 3px;
        }
      `}</style>
      <img src={iconUrl} />
      <span className="deckEssenceCell" data-cy="deckEssenceCell">
        {essence}
      </span>
    </span>
  );
}

EssenceIndicator.propTypes = {
  essence: PropTypes.number
};
