import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { nameToImage } from '../lib/card.js';

const cdn = process.env.MG_CARDS_CDN;

const getPath = (name, set = 'core') => {
  return `${cdn}/${set.toLowerCase()}/s/${nameToImage(name)}.png`;
};

export default function CardListItem({ card, onClick }) {
  const imgAlt = card.name;
  const imgPath = getPath(card.name, card.set || undefined);

  return (
    <>
      <style jsx>{`
        img {
          width: 160px;
        }
      `}</style>
      {onClick && (
        <span
          role="button"
          data-cy="cardListCard"
          onClick={e => onClick(e, card)}
        >
          <img src={imgPath} alt={imgAlt} />
        </span>
      )}
      {!onClick && (
        <Link href={`/card?id=${card.id}`}>
          <a data-cy="cardListCard">
            <img src={imgPath} alt={imgAlt} />
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
