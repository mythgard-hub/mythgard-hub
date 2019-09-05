import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  imagePath as getPath,
  imagePathMedium as getHoverPath
} from '../lib/card.js';

const smallImageWidth = 160;
const hoverImageWidth = 320;
const hoverImageVerticalOffset = 64;

export default function CardListItem({ card, onClick }) {
  const imgAlt = card.name;
  const imgPath = getPath(card.name, card.set || undefined);
  const imgPathMedium = getHoverPath(card.name, card.set || undefined);

  return (
    <>
      <style jsx>{`
        .cardListImg {
          width: ${smallImageWidth}px;
        }
        .imgWrapper {
          display: inline-block;
          position: relative;
        }
        // hover image
        .imgWrapper:hover::before {
          content: url(${imgPathMedium});
          width: ${hoverImageWidth}px;
          position: absolute;
          top: -${hoverImageVerticalOffset}px;
          left: -${smallImageWidth / 2}px;
          z-index: 2;
        }
      `}</style>
      {onClick && (
        <div
          role="button"
          data-cy="cardListCard"
          className="imgWrapper"
          onClick={e => onClick(e, card)}
        >
          <img className="cardListImg" src={imgPath} alt={imgAlt} />
        </div>
      )}
      {!onClick && (
        <Link href={`/card?id=${card.id}`}>
          <a data-cy="cardListCard" className="imgWrapper">
            <img className="cardListImg" src={imgPath} alt={imgAlt} />
          </a>
        </Link>
      )}
    </>
  );
}

CardListItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    set: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
};
