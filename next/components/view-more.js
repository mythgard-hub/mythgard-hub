import PropTypes from 'prop-types';

function ViewMore({ url, count, limit = 3 }) {
  return (
    <>
      <style jsx>{`
        .view-more {
          font-size: 0.7em;
          margin-top: -5px;
          margin-right: 20px;
          font-weight: 600;
          text-align: right;
          color: #ffffff;
          text-transform: uppercase;
        }
        .view-more > a {
          text-decoration: none;
        }
        .view-more-button {
          cursor: pointer;
        }
        .view-more-button:before {
          text-decoration: none;
          content: '\u25b6';
          font-size: 80%;
          margin-right: 5px;
        }
      `}</style>
      {url && limit !== -1 && count > limit && (
        <div className="view-more">
          <a href={url}>View More</a>
        </div>
      )}
    </>
  );
}

ViewMore.propTypes = {
  limit: PropTypes.number,
  url: PropTypes.string,
  count: PropTypes.number
};

ViewMore.defaultProps = {
  limit: 3
};

export default ViewMore;
