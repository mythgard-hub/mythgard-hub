import { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';
import EssenceIndicator from './essence-indicator.js';
import FactionsIndicator from './factions-indicator.js';
import { deckPreviewsToDecks } from '../lib/deck-queries.js';

export default function DeckList({ decks: fullDecks }) {
  const deckPreviews = fullDecks.map(d => d.deckPreviews.nodes[0]);
  const decks = deckPreviewsToDecks(deckPreviews);

  const theme = useContext(ThemeContext);
  return (
    <div>
      <style jsx>{`
        .deckListTable {
          width: 100%;
          border-collapse: collapse;
        }
        .deckListRow {
          border-top: ${theme.border};
        }
        .deckListRow td {
          padding: 15px 10px 15px 10px;
        }
        .zebraRow {
          background-color: ${theme.zebraRowBackground};
        }
        img {
          max-height: 15px;
          vertical-align: top;
          margin-right: 5px;
        }
        .deckName :global(a) {
          color: ${theme.deckNameColor};
          font-size: 20px;
          font-weight: bold;
          text-decoration: none;
        }
        .deckAuthor {
          font-size: 14px;
          line-height: 2;
        }
        .modifiedDate span {
          float: right;
        }
        .factions {
          text-align: center;
        }
      `}</style>
      <table className="deckListTable">
        <tbody>
          {decks.map((deck, index) => {
            const classNames = `deckListRow ${index % 2 ? 'zebraRow' : ''}`;
            const author =
              deck && deck.author ? deck.author.username : 'unknown';
            const modified = new Date(fullDecks[index].modified);
            const currFactions = <FactionsIndicator factions={deck.factions} />;
            const essenceCost = deck.essenceCost;

            return (
              <tr key={index} className={classNames} data-cy="deckListItem">
                <td>
                  <div className="deckName">
                    <Link href={`/deck?id=${deck.id}`}>
                      <a>{deck.name}</a>
                    </Link>
                  </div>
                  <div className="deckAuthor">by {author}</div>
                </td>
                <td className="factions" data-cy="deckFactionsCell">
                  {currFactions}
                </td>
                <td className="mana">
                  <EssenceIndicator essence={essenceCost} />
                </td>
                <td className="modifiedDate">
                  <span>
                    {modified.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DeckList.propTypes = {
  decks: PropTypes.array
};
