import { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import GemDot from './gem-dot';
import { cardMainColor } from '../lib/card';
import { FACTION_COLORS } from '../constants/factions';

export default function DeckCardsTable({ deck, deleteCard, onlyTable }) {
  const theme = useContext(ThemeContext);
  const deckCards = deck && Object.values(deck.mainDeck);
  const power = (deck.deckPower && deck.deckPower.name) || '[no power]';
  const path = (deck.deckPath && deck.deckPath.name) || '[no path]';
  const colspan = deleteCard ? 3 : 2;

  /**
   * Returns a score that can be used to sort cards by faction. Note that
   * this score should only be used to compare cards with the same number
   * of factions.
   */
  const factionSortScore = card => {
    const colorOrder = {
      [FACTION_COLORS.blue]: 32,
      [FACTION_COLORS.yellow]: 16,
      [FACTION_COLORS.red]: 8,
      [FACTION_COLORS.green]: 4,
      [FACTION_COLORS.orange]: 2,
      [FACTION_COLORS.purple]: 1
    };
    const factionNames = card.cardFactions.nodes
      .filter(Boolean)
      .map(n => n.faction.name.toLowerCase());
    return Object.keys(colorOrder).reduce((acc, curr) => {
      if (factionNames.indexOf(curr) === -1) {
        return acc;
      }
      return acc + colorOrder[curr];
    }, 0);
  };

  const sortCards = (a, b) => {
    const aCard = a.card;
    const bCard = b.card;

    // Cards with one faction come before cards with multiple factions
    const aCardFactions = aCard.cardFactions.nodes.filter(Boolean);
    const bCardFactions = bCard.cardFactions.nodes.filter(Boolean);
    if (aCardFactions.length !== bCardFactions.length) {
      return aCardFactions.length - bCardFactions.length;
    }

    // Next, cards are sorted by faction
    // Single: Blue, Yellow, Red, Green, Orange, Purple
    // Multi: BY, BR, BG, BO, BP, YR, YG, YO, YP, RG, RO, RP, GO, GP, OP
    // Cards that receive the higher score should come first
    const aCardScore = factionSortScore(aCard);
    const bCardScore = factionSortScore(bCard);
    if (aCardScore !== bCardScore) {
      return bCardScore - aCardScore;
    }

    // Within color, sort by mana cost
    if (aCard.mana !== bCard.mana) {
      return aCard.mana - bCard.mana;
    }

    // Lastly, sort alphabetically
    const aName = aCard.name.toLowerCase();
    const bName = bCard.name.toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };

  const sortedCards = deckCards.sort(sortCards);

  return (
    <div className="deck-card-table-container">
      <style jsx>{`
        .deck-card-table-container {
          margin-top: 10px;
          padding: 10px;
        }
        .deck-card-table {
          border-collapse: collapse;
          width: 100%;
        }
        td {
          padding: 2px 5px 5px 5px;
          border: 1px solid #03080a;
        }
        .deck-title {
          font-size: 30px;
          margin: 0 0 20px 5px;
        }
        .deck-delete-card {
          cursor: pointer;
          text-align: center;
          text-decoration: underline;
        }
        .deck-card-link,
        .deck-card-link:hover,
        .deck-card-link:focus {
          color: ${theme.cardTableName};
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.8em;
        }
      `}</style>
      {!onlyTable && (
        <div className="deck-title">{deck.deckName || '[untitled]'}</div>
      )}
      <table className="deck-card-table" data-cy="deckCardTable">
        <tbody>
          <tr>
            <td colSpan={2}>Path</td>
            <td colSpan={colspan}>{path}</td>
          </tr>
          <tr>
            <td colSpan={2}>Power</td>
            <td colSpan={colspan}>{power}</td>
          </tr>
          {sortedCards.map(deckCard => {
            const backgroundColor = cardMainColor(deckCard.card, theme);
            const color = backgroundColor ? theme.cardTableName : 'inherit';
            return (
              <tr key={deckCard.card.id} data-cy="deckCardRow">
                <td>{deckCard.card.mana < 0 ? 'X' : deckCard.card.mana}</td>
                <td>
                  <GemDot gems={deckCard.card.gem} />
                </td>
                <td style={{ backgroundColor, color }}>
                  <Link href={`/card?id=${deckCard.card.id}`}>
                    <a className="deck-card-link">{deckCard.card.name}</a>
                  </Link>
                </td>
                <td>&times;{deckCard.quantity}</td>
                {deleteCard && (
                  <td
                    data-cy="deckDeleteCard"
                    className="deck-delete-card"
                    onClick={() => deleteCard(deckCard.card.id)}
                  >
                    &times;
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DeckCardsTable.propTypes = {
  onlyTable: PropTypes.bool,
  deleteCard: PropTypes.func,
  deck: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckPath: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      quantity: PropTypes.number,
      card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        mana: PropTypes.number,
        gem: PropTypes.number
      })
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};
