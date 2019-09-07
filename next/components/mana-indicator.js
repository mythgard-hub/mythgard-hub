import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function ManaIndicator({ mana }) {
  const theme = useContext(ThemeContext);
  const iconUrl = `${process.env.MG_CDN}/filters/essence.png`;

  return (
    <span>
      <style jsx>{`
        span {
          color: ${theme.manaColor};
          font-weight: bold;
          font-size: 18px;
        }
        img {
          max-height: 12px;
          margin-right: 3px;
        }
      `}</style>
      <img src={iconUrl} />
      {mana}
    </span>
  );
}

ManaIndicator.propTypes = {
  mana: PropTypes.number
};
