import PropTypes from 'prop-types';
import CardListItem from './card-list-item.js';

export default function PathList({ onPathClick, paths }) {
  return (
    <>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }
        ul li {
          margin-right: 17px;
          margin-bottom: 17px;
          min-width: 240px;
        }
      `}</style>
      <ul className="pathList" data-cy="pathList">
        {paths.map((path, index) => {
          return (
            <li key={index}>
              <CardListItem
                card={path}
                onClick={onPathClick}
                options={{ isLandscape: true }}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

PathList.propTypes = {
  paths: PropTypes.array,
  onPathClick: PropTypes.func
};
