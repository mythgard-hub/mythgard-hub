import { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { ThemeContext } from './theme-context';
import { deckFactions } from '../lib/deck-queries';
import { FACTION_IMAGES } from '../constants/factions';
import ErrorMessage from './error-message';
import { collectDeckFactions } from '../lib/deck-utils';

export default function DeckList({ decks }) {
  if (!decks || !decks.length) return null;

  const theme = useContext(ThemeContext);

  const deckIds = decks.map(deck => deck.id);
  const { loading, error, data } = useQuery(deckFactions, {
    variables: {
      deckIds
    }
  });

  if (loading) return 'Loading...';
  if (error) return <ErrorMessage message={error.message} />;

  const factions = collectDeckFactions(data);

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
          background-color: ${theme.zebraRowBackroung};
        }
        img {
          max-height: 15px;
          vertical-align: top;
          margin-right: 5px;
        }
        .deckName :global(a) {
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
        }
        .deckAuthor {
          font-size: 14px;
          line-height: 2;
        }
        .modifiedDate {
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
            const modified = new Date(deck.modified);
            const currFactions = factions[deck.id]
              ? [...new Set(factions[deck.id])].map(f => (
                  <img src={FACTION_IMAGES[f]} />
                ))
              : '';

            return (
              <tr key={deck.id} className={classNames} data-cy="deckListItem">
                <td>
                  <div className="deckName">
                    <Link href={`/deck?id=${deck.id}`} key={index}>
                      {deck.name}
                    </Link>
                  </div>
                  <div className="deckAuthor">by {author}</div>
                </td>
                <td className="factions">{currFactions}</td>
                <td className="modifiedDate">
                  {modified.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
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
