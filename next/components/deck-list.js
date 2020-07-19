import { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';
import EssenceIndicator from './essence-indicator.js';
import FactionsIndicator from './factions-indicator.js';
import LargeTable from './large-table.js';
import UpvoteIndicator from './upvote-indicator.js';
import { getArchetypeLabel, getTypeLabel } from '../lib/deck-utils';
import AuthorLink from './author-link';
import UserAvatar from './user-avatar';

export default function DeckList({ decks }) {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <style jsx>{`
        .deckNameAndAuthor {
          display: flex;
        }
        .user-avatar {
          padding-right: 20px;
        }
        .deckName {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .deckLink {
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
        .archetype {
          font-weight: 600;
        }
        .type {
          font-weight: 200;
        }
        .deckVotes,
        .factions,
        .mana,
        .modifiedDate {
          white-space: nowrap;
        }
        @media only screen and (max-width: 575.98px) {
          .factions,
          .mana,
          :global(.upvoteIndicator) {
            white-space: nowrap;
          }
        }
      `}</style>
      <LargeTable>
        <tbody>
          {decks.map((deck, index) => {
            const classNames = index % 2 ? 'zebraRow' : '';
            const author = deck.username || 'unknown';

            const modified = new Date(deck.deckModified || deck.deckCreated);
            const archetype = getArchetypeLabel(deck);
            const type = getTypeLabel(deck);

            return (
              <tr key={index} className={classNames} data-cy="deckListItem">
                <td>
                  <div className="deckNameAndAuthor" data-cy="deckName">
                    <div className="user-avatar">
                      <UserAvatar
                        profileIconId={deck.profileIconId}
                        accountType={deck.accountType}
                        small
                      />
                    </div>
                    <div className="deckName">
                      <Link href={`/deck?id=${deck.deckId}`}>
                        <a className="deckLink">{deck.deckName}</a>
                      </Link>
                      <div className="deckAuthor">
                        by <AuthorLink author={author} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="deckVotes">
                  <UpvoteIndicator votes={deck.votes || 0} />
                </td>
                <td className="factions" data-cy="deckFactionsCell">
                  <FactionsIndicator factions={deck.factions} />
                </td>
                <td className="archetype-type-column">
                  <div className="archetype" data-cy="deckArchetypeCell">
                    {archetype}
                  </div>
                  <div className="type" data-cy="deckTypeCell">
                    {type}
                  </div>
                </td>
                <td className="mana">
                  <EssenceIndicator essence={deck.essenceCost} />
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
      </LargeTable>
    </div>
  );
}

DeckList.propTypes = {
  decks: PropTypes.array
};
