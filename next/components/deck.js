import { useQuery } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckCardList from './deck-card-list';
import DeckExport from './deck-export';
import DeckDelete from './deck-delete';
import { initializeDeckBuilder } from '../lib/deck-utils';
import { deckCardsQuery } from '../lib/deck-queries';

const getDeckToExport = (deckCards, deckName, path = null, power = null) => {
  const deckToExport = initializeDeckBuilder();
  deckToExport.deckName = deckName;
  deckToExport.deckPath = path ? path.name : '';
  deckToExport.deckPower = power ? power.name : '';
  deckToExport.mainDeck = {
    ...deckCards
  };

  return deckToExport;
};

export default function Deck({ deck }) {
  const { loading, error, data } = useQuery(deckCardsQuery, {
    variables: { id: deck.id }
  });

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading</div>;

  const cards = data.deck ? data.deck.cardDecks.nodes : [];
  const { power, path, author } = deck;
  const deckToExport = getDeckToExport(cards, deck.name, path, power);
  const authorName = (author && author.username) || 'unknown';

  return (
    <>
      <h1 className="deckName">{deck.name}</h1>
      <div>by {authorName}</div>
      <h2>Power</h2>
      {power ? power.name : 'No Power Selected'}
      <h2>Path</h2>
      {path ? path.name : 'No Path Selected'}
      <h2>Cards</h2>
      <DeckCardList deckCards={cards} />
      <DeckExport deckInProgress={deckToExport} />
      <DeckDelete deck={deck} />
    </>
  );
}

Deck.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cardDecks: PropTypes.array,
    power: PropTypes.shape({ name: PropTypes.string.isRequired }),
    path: PropTypes.shape({ name: PropTypes.string.isRequired })
  }).isRequired
};
