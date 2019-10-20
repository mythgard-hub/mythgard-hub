import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { imagePathSmall, imagePathMedium, IMAGE_SIZES } from '../lib/card.js';

export default function CardListItem({ card, onClick, options }) {
  options = options || {};
  const imgAlt = card.name;
  const imagePathFn = options.isLandscape ? imagePathMedium : imagePathSmall;
  const imgPath = imagePathFn(card.name, card.set || undefined);
  const imgPathMedium = imagePathMedium(card.name, card.set || undefined);
  const smallImageWidth = options.isLandscape
    ? IMAGE_SIZES.smallImageWidthLandscape
    : IMAGE_SIZES.smallImageWidthPortrait;

  return (
    <>
      <style jsx>{`
        .cardListImg {
          min-width: ${smallImageWidth}px;
          width: ${smallImageWidth}px;
        }
        .imgWrapper {
          display: inline-block;
          position: relative;
        }
        // bigger version of the image (hidden until hover)
        .imgWrapper::before {
          content: url(${imgPathMedium});
          width: ${IMAGE_SIZES.hoverImageWidth}px;
          position: absolute;
          top: -${IMAGE_SIZES.hoverImageVerticalOffset}px;
          left: -${(IMAGE_SIZES.hoverImageWidth - smallImageWidth) / 2}px;
          z-index: 2;
          opacity: 0;
        }

        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .imgWrapper:hover::before {
            opacity: 1;
            transition-delay: 0.7s;
          }
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
  onClick: PropTypes.func,
  options: PropTypes.shape({
    isLandscape: PropTypes.bool
  })
};
