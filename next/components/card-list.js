import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CardList({ cards }) {
  return (
    <ul className="cardList">
      {cards.map((card, index) => (
        <li key={card.id}>
          {card.quantity && <span>{card.quantity}</span>}&nbsp;
          <Link href={`/card?id=${card.id}`} key={index}>
            <a>
              {card.id}. name: {card.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
CardList.propTypes = {
  cards: PropTypes.array
};
