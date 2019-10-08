import { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';
import EssenceIndicator from './essence-indicator.js';
import FactionsIndicator from './factions-indicator.js';

export default function EventList({ events }) {
  // No idea what needs to be done here - M
  const deckMetaData = decks.map(d => d.deckPreviews.nodes[0]);

  const theme = useContext(ThemeContext);
  return (
    <div>
      <style jsx>{`
        .eventListTable {
          width: 100%;
          border-collapse: collapse;
        }
        .eventListRow {
          border-top: ${theme.border};
        }
        .eventListRow td {
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
        .eventName :global(a) {
          color: ${theme.deckNameColor};
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
        }
        .eventOrganizer {
          text-align: center;
          font-weight: 500;
        }
        .eventDate span {
          float: right;
          font-size: .7em;
          font-weight: 400;
          color: ${mgColors.lightBlue};
        }
      `}</style>
      <table className="eventListTable">
        <tbody>
          // No idea what needs to be done here - M
          {decks.map((deck, index) => {
            const classNames = `eventListRow ${index % 2 ? 'zebraRow' : ''}`;
            const author =
              deck && deck.author ? deck.author.username : 'unknown';

            const deckModifiedMeta =
              deckMetaData[index] && deckMetaData[index].deckCreated;
            const modified = new Date(deck.modified || deckModifiedMeta);

            return (
              <tr key={index} className={classNames} data-cy="deckListItem">
                <td>
                  <div className="eventName">
                    // Name of event goes here, linked to event results page
                    <Link href={`/deck?id=${deck.id}`}>
                      <a>{deck.name}</a>
                    </Link>
                  </div>

                  <div className="eventOrganizer">
                    // Name of event organizer goes here
                  </div>
                </td>
                <td className="eventDate">
                  <span>
                    // Date of event goes here
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
