import Link from 'next/link';
import PropTypes from 'prop-types';

export default function DeckList({ decks }) {
  return (
    <ul>
      {decks.map((deck, index) => {
        const author = deck && deck.author ? deck.author.username : 'unknown';

        return (
          <li data-cy="deckListItem" key={deck.id}>
            <Link href={`/deck?id=${deck.id}`} key={index}>
              <a>
                {index + 1}. name: {deck.name}. by: {author}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

DeckList.propTypes = {
  decks: PropTypes.array
};
