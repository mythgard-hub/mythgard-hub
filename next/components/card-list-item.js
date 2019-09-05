import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { nameToImage } from '../lib/card.js';

const cdn = process.env.MG_CARDS_CDN;

const getPath = (name, set = 'core') => {
  return `${cdn}/${set.toLowerCase()}/s/${nameToImage(name)}.png`;
};

const getHoverPath = (name, set = 'core') => {
  return `${cdn}/${set.toLowerCase()}/m/${nameToImage(name)}.png`;
};

export default function CardListItem({ card, onClick }) {
  const imgAlt = card.name;
  const imgPath = getPath(card.name, card.set || undefined);
  const imgPathMedium = getHoverPath(card.name, card.set || undefined);

  return (
    <>
      <style jsx>{`
        .cardListImg {
          width: 160px;
        }
        .imgWrapper {
          display: inline-block;
          position: relative;
        }
        // hover image
        .imgWrapper:hover::before {
          content: url(${imgPathMedium});
          width: 320px;
          position: absolute;
          top: -64px;
          left: -80px; // relative to small img
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
