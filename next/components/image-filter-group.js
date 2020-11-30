import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

function ImageFilterGroup({ images, selected, onChange, cyName }) {
  const theme = useContext(ThemeContext);

  const onClick = image => {
    if (selected.indexOf(image.key) > -1) {
      onChange(selected.filter(s => s !== image.key));
      return;
    }

    onChange([...selected, image.key]);
  };

  return (
    <div data-cy={cyName}>
      <style jsx>{`
        .row {
          display: flex;
          margin-bottom: 12px;
        }
        .row:hover {
          cursor: pointer;
        }
        .row span {
          padding-top: 5px;
        }
        img {
          cursor: pointer;
          height: 30px;
          margin-right: 20px;
          opacity: 0.6;
        }
        img:hover {
          filter: ${theme.hoverGlow};
        }
        .selected {
          color: ${theme.fontColorSelected};
        }
        .selected img {
          opacity: 1;
        }
      `}</style>
      {images.map(i => (
        <div
          data-cy="imgFilterBtn"
          onClick={() => onClick(i)}
          key={i.key}
          className={`row ${selected.indexOf(i.key) > -1 ? 'selected' : null}`}
        >
          <img src={i.link} />
          <span>{i.key}</span>
        </div>
      ))}
    </div>
  );
}

ImageFilterGroup.propTypes = {
  selected: PropTypes.array,
  onChange: PropTypes.func,
  cyName: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default ImageFilterGroup;
