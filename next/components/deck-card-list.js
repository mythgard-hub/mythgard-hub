import Link from 'next/link';
import PropTypes from 'prop-types';

export default function DeckCardList({ cards }) {
  return (
    <ul className="deckCardList" data-cy="deckCardList">
      {cards.map((card, index) => (
        <li key={index}>
          <Link href={`/card?id=${card.id}`} key={index}>
            <a data-cy="deckCardListCard">
              {card.id}. name: {card.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
DeckCardList.propTypes = {
  cards: PropTypes.array
};
