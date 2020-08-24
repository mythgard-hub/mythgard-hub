import PropTypes from 'prop-types';

export default function ViewsIndicator({ views }) {
  return (
    <span className="viewsIndicator">
      <style jsx>{`
        img {
          max-height: 12px;
          margin-right: 3px;
        }
        span {
          padding-left: 5px;
        }
      `}</style>
      <img src={`${process.env.MG_CDN}/icons/eyeball.svg`} />
      <span className="viewsCell" data-cy="viewsCell">
        {views || 0}
      </span>
    </span>
  );
}

ViewsIndicator.propTypes = {
  views: PropTypes.number
};
