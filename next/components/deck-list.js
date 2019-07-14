import Link from 'next/link';
import PropTypes from 'prop-types';

export default function DeckList(props) {
  return (
    <ul>
      {props.decks.map((card, index) => (
        <li key={card.id}>
          <Link href={`/card?id=${card.id}`} key={index}>
            <a>
              {index + 1}. name: {card.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
DeckList.propTypes = {
  decks: PropTypes.array
};
