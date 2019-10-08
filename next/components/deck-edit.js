import PropTypes from 'prop-types';
import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../components/user-context';

function DeckEdit({ deck }) {
  const { user } = useContext(UserContext);

  // Users can only delete decks they authored
  if (!user || !deck || !deck.id || !deck.author || user.id !== deck.author.id)
    return null;

  return (
    <div style={{ marginBottom: '10px' }}>
      <Link href={`/deck-builder?id=${deck.id}`}>
        <a className="button">Edit</a>
      </Link>
    </div>
  );
}

DeckEdit.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired
};

export default DeckEdit;
