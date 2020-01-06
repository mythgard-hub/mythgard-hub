import PropTypes from 'prop-types';

export default function DeckCount({ imagesAndCounts, dataCyName }) {
  return (
    <div className="deck-counts" data-cy={`${dataCyName}s`}>
      <style jsx>{`
        .deck-counts {
          display: flex;
        }
        .count {
          display: flex;
          margin-right: 30px;
        }
        .image {
          height: 20px;
          margin-right: 7px;
        }
      `}</style>
      {imagesAndCounts.map((r, i) => (
        <div key={i} className="count">
          <img className="image" src={r.link} />{' '}
          <div data-cy={dataCyName}>{r.count}</div>
        </div>
      ))}
    </div>
  );
}

DeckCount.propTypes = {
  dataCyName: PropTypes.string,
  imagesAndCounts: PropTypes.array
};
