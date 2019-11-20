import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckExport from './deck-export';
import DeckEdit from './deck-edit';
import DeckDelete from './deck-delete';
import {
  initializeDeckBuilder,
  getAuthor,
  getEssenceCost,
  getDateCreated,
  getFactions
} from '../lib/deck-utils';
import DeckVote from './deck-vote';
import { deckCardsQuery } from '../lib/deck-queries';
import DeckCardsTable from './deck-card-table';
import EssenceIndicator from './essence-indicator.js';
import FactionsIndicator from './factions-indicator.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';

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
  if (loading) return <div>Loading...</div>;

  const theme = useContext(ThemeContext);

  const cards = data.deck ? data.deck.cardDecks.nodes : [];
  const { power, path } = deck;
  const deckToExport = getDeckToExport(cards, deck.name, path, power);
  const authorName = getAuthor(deck);
  const essenceCost = getEssenceCost(deck);
  const factions = getFactions(deck);
  const dateCreated = getDateCreated(deck);

  return (
    <div className="deck-page-container">
      <style jsx>{`
        .deck-page-container {
          display: flex;
          flex-wrap: wrap;
        }

        .left-col {
          margin-top: ${theme.spacing}px;
          flex: 1;
        }

        .right-col {
          margin-top: ${theme.spacing}px;
          flex: 1;
          margin-left: ${theme.spacing * 2}px;
        }

        .deck-name {
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .deck-author {
          margin-bottom: 20px;
        }

        .coming-soon {
          font-style: italic;
        }

        .stats-title {
          text-transform: uppercase;
          font-style: italic;
          font-weight: bold;
          font-size: 1em;
        }

        .date-created {
          text-transform: uppercase;
        }

        .deck-actions {
          display: flex;
          flex-wrap: wrap;
        }

        :global(.deck-actions .deck-action + .deck-action) {
          margin-left: 10px;
        }

        :global(.deck-actions .deck-action) {
          flex-grow: 999;
        }

        :global(.deck-actions .deck-action.no-grow) {
          flex-grow: 1;
        }

        .gradient-hr {
          margin: 10px 0;
        }

        .deck-stats {
          margin-top: 10px;
        }

        .gradient-hr + .deck-stat {
          margin-bottom: 20px;
        }

        @media only screen and (max-width: 575.98px) {
          .deck-page-container {
            flex-direction: column;
          }
          .right-col {
            margin-left: 0;
          }
        }
      `}</style>
      <div className="left-col">
        <div className="deck-name" data-cy="deckName">
          {deck.name}
        </div>
        <div className="deck-author">by {authorName}</div>
        <DeckCardsTable deck={deckToExport} onlyTable />
      </div>
      <div className="right-col">
        <div className="deck-actions">
          <DeckExport className="deck-action" deckInProgress={deckToExport} />
          <DeckEdit className="deck-action" deck={deck} />
          <DeckDelete className="deck-action" deck={deck} />
          <DeckVote className="deck-action no-grow" deck={deck} />
        </div>
        <div className="deck-stats-container">
          <div className="deck-stats">
            <div className="stats-title">Essence</div>
            <hr className="gradient-hr" />
            <div className="deck-stat">
              <EssenceIndicator essence={essenceCost} />
            </div>
            <div className="stats-title factions-title">Factions</div>
            <hr className="gradient-hr" />
            <div className="deck-stat">
              <FactionsIndicator factions={factions} />
            </div>
            <div className="stats-title factions-title">Deck Created</div>
            <hr className="gradient-hr" />
            <div className="deck-stat date-created" data-cy="deckCreatedDate">
              {dateCreated}
            </div>
          </div>
        </div>
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
    path: PropTypes.shape({ name: PropTypes.string.isRequired }),
    author: PropTypes.shape({ username: PropTypes.string.isRequired }),
    deckPreviews: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          essenceCost: PropTypes.number,
          factions: PropTypes.arrayOf(PropTypes.string),
          deckCreated: PropTypes.string
        })
      )
    })
  }).isRequired
};
