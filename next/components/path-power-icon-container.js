import PropTypes from 'prop-types';

export default function PathPowerIconContainer({ icon, large = false }) {
  if (!icon) return null;

  return (
    <div className={`icon-container ${large && 'large'}`}>
      <style jsx>{`
        .icon-container {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .large {
          width: 25px;
          height: 25px;
        }
        img {
          width: 20px;
          height: auto;
        }
        .large img {
          width: 25px;
        }
      `}</style>
      <img src={icon} />
    </div>
  );
}

PathPowerIconContainer.propTypes = {
  icon: PropTypes.string,
  large: PropTypes.bool
};
