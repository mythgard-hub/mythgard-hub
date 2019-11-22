import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function SliderSwitch({
  checked,
  onChange,
  leftSlider,
  rightSlider,
  onClickLabel
}) {
  const theme = useContext(ThemeContext);

  return (
    <div className="switch-container">
      <style jsx>{`
        .switch-container {
          display: flex;
          margin-bottom: 20px;
        }
        .leftSlider,
        .rightSlider {
          padding-top: 2px;
          cursor: pointer;
        }
        .leftSlider:hover,
        .rightSlider:hover {
          color: ${theme.switchColor};
        }
        .leftSlider {
          margin-right: 10px;
        }
        .rightSlider {
          margin-left: 10px;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 25px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme.switchColor};
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: '';
          height: 19px;
          width: 19px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: ${theme.switchColor};
        }
        input:focus + .slider {
          box-shadow: 0 0 1px ${theme.switchColor};
        }
        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }

        @media only screen and (max-width: 575.98px) {
          .switch-container{
            justify-content: center;
          }
        }
      `}</style>
      <span
        className="leftSlider"
        data-cy="leftSlider"
        onClick={() => onClickLabel(false)}
      >
        {leftSlider}
      </span>
      <div className="switch" onClick={onChange}>
        <input type="checkbox" checked={checked} readOnly />
        <span className="slider round" />
      </div>
      <span
        className="rightSlider"
        data-cy="rightSlider"
        onClick={() => onClickLabel(true)}
      >
        {rightSlider}
      </span>
    </div>
  );
}

SliderSwitch.propTypes = {
  leftSlider: PropTypes.string,
  rightSlider: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClickLabel: PropTypes.func
};
