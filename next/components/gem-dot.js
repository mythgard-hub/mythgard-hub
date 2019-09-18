import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function GemDot({ gems }) {
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
      <span style={{ color: gemColor }} key={index}>
        {String.fromCharCode(8226)}
      </span>
    );
  });

  return (
    <span>
      <style jsx>{`
        span {
          font-size: 24px;
        }
      `}</style>
      {gemElements}
    </span>
  );
}

GemDot.propTypes = {
  gems: PropTypes.string
};
