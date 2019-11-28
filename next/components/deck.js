import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';
import DeckExport from './deck-export';
import DeckEdit from './deck-edit';
import DeckDelete from './deck-delete';
import DeckDescriptionEdit from './deck-description-edit.js';

import {
  initializeDeckBuilder,
  getAuthor,
  getEssenceCost,
  getDateCreated,
  getFactions,
  getDeckArchetype,
  getDeckType,
  getCardCount
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
  const theme = useContext(ThemeContext);

  if (error) return <ErrorMessage message="Error loading decks." />;
  if (loading) return <div>Loading...</div>;

  const cards = data.deck ? data.deck.cardDecks.nodes : [];
  const { power, path } = deck;
  const deckToExport = getDeckToExport(cards, deck.name, path, power);
  const authorName = getAuthor(deck);
  const essenceCost = getEssenceCost(deck);
  const factions = getFactions(deck);
  const dateCreated = getDateCreated(deck);
  const archetype = getDeckArchetype(deck);
  const type = getDeckType(deck);
  const cardCount = getCardCount(deckToExport);

  return (
    <div className="deck-page-container">
      <style jsx>{`
        .two-columns {
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
          margin-bottom: 10px;
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
          margin: 8px 0;
        }

        .deck-stats {
          margin: 10px 0 20px;
        }

        .gradient-hr + .deck-stat {
          margin-bottom: 30px;
        }

        .deck-description {
          margin: 20px 0;
        }

        .deck-subtitle {
          display: flex;
          justify-content: space-between;
        }

        @media only screen and (max-width: 575.98px) {
          .deck-page-container {
            flex-direction: column;
          }
          .two-columns {
            flex-direction: column;
          }
          .right-col {
            margin-left: 0;
          }
          .deck-author {
            margin-bottom: 5px;
          }
        }
      `}</style>
      <div className="two-columns">
        <div className="left-col">
          <div className="deck-name" data-cy="deckName">
            {deck.name}
          </div>
          <div className="deck-subtitle">
            <div className="deck-author">by {authorName}</div>
            <div className="card-count" data-cy="deckPageCardCount">
              Cards: <span>{cardCount}</span>
            </div>
          </div>
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
              <div className="stats-title">Type</div>
              <hr className="gradient-hr" />
              <div className="deck-stat" data-cy="deckPageType">
                {type}
              </div>
              <div className="stats-title">Archetype</div>
              <hr className="gradient-hr" />
              <div className="deck-stat" data-cy="deckPageArchetype">
                {archetype}
              </div>
              <div className="stats-title factions-title">Deck Created</div>
              <hr className="gradient-hr" />
              <div className="deck-stat date-created" data-cy="deckCreatedDate">
                {dateCreated}
              </div>
              <div className="stats-title factions-title">Factions</div>
              <hr className="gradient-hr" />
              <div className="deck-stat">
                <FactionsIndicator factions={factions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="deck-description">
        <div className="stats-title">Description</div>
        <hr className="gradient-hr" />
        <DeckDescriptionEdit deck={deck} />
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
