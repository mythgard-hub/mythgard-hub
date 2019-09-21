import { useQuery } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckExport from './deck-export';
import DeckEdit from './deck-edit';
import DeckDelete from './deck-delete';
import { initializeDeckBuilder } from '../lib/deck-utils';
import { deckCardsQuery } from '../lib/deck-queries';
import DeckCardsTable from './deck-card-table';

const getDeckToExport = (deckCards, deckName, path = null, power = null) => {
  const deckToExport = initializeDeckBuilder();
  deckToExport.deckName = deckName;
  deckToExport.deckPath = path ? { name: path.name } : {};
  deckToExport.deckPower = power ? { name: power.name } : {};
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
    <div className="deck-page-container">
      <style jsx>{`
        .deck-page-container {
          display: flex;
        }

        .deck-details {
          width: 70%;
          padding-right: 20px;
          padding-bottom: 50px;
        }

        .deck-actions {
          width: 30%;
        }

        .deck-name {
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 5px;
        }

        .deck-author {
          margin-bottom: 20px;
        }

        @media only screen and (max-width: 600px) {
          .deck-page-container {
            flex-direction: column;
          }

          .deck-details,
          .deck-actions {
            width: 100%;
          }
        }
      `}</style>
      <div className="deck-details">
        <div className="deck-name" data-cy="deckName">
          {deck.name}
        </div>
        <div className="deck-author">by {authorName}</div>
        <DeckCardsTable deck={deckToExport} onlyTable />
      </div>
      <div className="deck-actions">
        <DeckExport deckInProgress={deckToExport} />
        <DeckEdit deck={deck} />
        <DeckDelete deck={deck} />
      </div>
    </div>
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
