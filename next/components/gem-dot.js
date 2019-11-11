import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function GemDot({ gems }) {
  if (!gems) return null;

  const theme = useContext(ThemeContext);
  const gemElements = gems.split('').map((gem, index) => {
    let gemColor = null;
    switch (gem) {
      case 'B':
        gemColor = theme.blueFactionColor;
        break;
      case 'Y':
        gemColor = theme.yellowFactionColor;
        break;
      case 'R':
        gemColor = theme.redFactionColor;
        break;
      case 'P':
        gemColor = theme.purpleFactionColor;
        break;
      case 'O':
        gemColor = theme.orangeFactionColor;
        break;
      case 'G':
        gemColor = theme.greenFactionColor;
        break;
    }

    return (
      <span style={{ backgroundColor: gemColor }} key={index}>
        <style jsx>{`
          span {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 2px;
          }
        `}</style>
      </span>
    );
  });

  return (
    <span>
      <style jsx>{`
        span {
          display: flex;
          justify-content: center;
        }
        span :last-child {
          margin-right: 0;
        }
      `}</style>
      {gemElements}
    </span>
  );
}

GemDot.propTypes = {
  gems: PropTypes.string
};
