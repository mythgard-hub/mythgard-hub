import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

const cdn = process.env.MG_CDN;
const images = [
  {
    key: 0,
    label: '0',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0006_0.png`
  },
  {
    key: 1,
    label: '1',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0005_1.png`
  },
  {
    key: 2,
    label: '2',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0004_2.png`
  },
  {
    key: 3,
    label: '3',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0003_3.png`
  },
  {
    key: 4,
    label: '4',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0002_4.png`
  },
  {
    key: 5,
    label: '5',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0001_5.png`
  },
  {
    key: 6,
    label: '6+',
    link: `${cdn}/filters/Filter-Icons_0000s_0001s_0000_6%2B.png`
  }
];

export default function NumericFilterGroup({ cyName, selected, onChange }) {
  const theme = useContext(ThemeContext);
  const onClick = image => {
    if (selected.indexOf(image.label) > -1) {
      onChange(selected.filter(s => s !== image.label));
      return;
    }

    onChange([...selected, image.label]);
  };

  return (
    <div data-cy={cyName}>
      <style jsx>{`
        img {
          cursor: pointer;
          height: 28px;
          margin-right: 15px;
          opacity: 0.6;
        }

        img:last-child {
          margin-right: 0;
        }

        img:hover {
          filter: ${theme.hoverGlow};
        }

        img.selected {
          opacity: 1;
          box-shadow: 0px 0px 5px #fff;
          border-radius: 50%;
        }
      `}</style>
      {images.map(i => (
        <img
          key={i.key}
          src={i.link}
          className={selected.indexOf(i.label) > -1 ? 'selected' : null}
          data-cy="numFilterBtn"
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
}

NumericFilterGroup.propTypes = {
  selected: PropTypes.array,
  onChange: PropTypes.func,
  cyName: PropTypes.string
};

NumericFilterGroup.defaultProps = {
  selected: []
};
