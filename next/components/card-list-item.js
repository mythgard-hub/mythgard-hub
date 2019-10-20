import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { imagePathSmall, imagePathMedium } from '../lib/card.js';

const smallImageWidthPortrait = 160;
const smallImageWidthLandscape = 240;
const hoverImageWidth = 320;
const hoverImageVerticalOffset = 64;

export default function CardListItem({ card, onClick, options }) {
  options = options || {};
  const imgAlt = card.name;
  const imagePathFn = options.isLandscape ? imagePathMedium : imagePathSmall;
  const imgPath = imagePathFn(card.name, card.set || undefined);
  const imgPathMedium = imagePathMedium(card.name, card.set || undefined);
  const smallImageWidth = options.isLandscape
    ? smallImageWidthLandscape
    : smallImageWidthPortrait;

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
          cursor: pointer;
        }
        // bigger version of the image (hidden until hover)
        .imgWrapper::before {
          content: url(${imgPathMedium});
          position: absolute;
          top: -${hoverImageVerticalOffset}px;
          left: -${(hoverImageWidth - smallImageWidth) / 2}px;
          z-index: 2;
          visibility: hidden;
          opacity: 0;
        }

        @media (hover: hover) {
          // Show the hover image (but only on devices that have hover)
          .imgWrapper:hover::before {
            visibility: visible;
            opacity: 1;
            transition-delay: 0.5s;
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
