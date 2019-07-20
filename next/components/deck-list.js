import Link from 'next/link';
import PropTypes from 'prop-types';

export default function DeckList({ decks }) {
  return (
    <ul>
      {decks.map((deck, index) => (
        <li key={deck.id}>
          <Link href={`/deck?id=${deck.id}`} key={index}>
            <a>
              {index + 1}. name: {deck.name}
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
