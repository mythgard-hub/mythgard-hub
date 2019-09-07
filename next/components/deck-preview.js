import React from 'react';
import ManaIndicator from './mana-indicator.js';
import UpvoteIndicator from './upvote-indicator.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import Link from 'next/link';
import { FACTION_IMAGES } from '../constants/factions';
import { dateToDeltaString } from '../lib/time.js';
import PropTypes from 'prop-types';

function DeckPreview({ deck }) {
  const theme = useContext(ThemeContext);
  const username =
    (deck.author && deck.author.username && deck.author.username) || 'unknown';
  return (
    <>
      <style jsx>{`
        .deckPreview {
          border: ${theme.sectionBorder};
          display: block;
          margin-bottom: 10px;
          padding: 10px;
          max-width: 277px;
        }

        .deckName :global(a) {
          color: ${theme.deckNameColor};
          font-weight: bold;
          text-decoration: none;
          font-size: 1.1em;
        }

        .subsection {
          margin-top: 10px;
          padding-top: 10px;
          border-top: ${theme.sectionBorder};
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap; /* seems preferable to squishing */
        }

        .factionIcons img {
          margin-right: 5px;
        }

        :global(.manaIndicator),
        :global(.upvoteIndicator),
        .factionIcons {
          display: block;
          height: 20px;
          display: flex;
          align-items: center;
        }

        .factionIcons img,
        :global(.manaIndicator img),
        :global(.upvoteIndicator img) {
          height: 15px;
          max-height: 15px;
        }

        :global(.manaIndicator span),
        :global(.upvoteIndicator span) {
          font-size: 16px;
        }
      `}</style>

      <div className="deckPreview">
        {/* TODO - duplicate code in deck-list.js*/}
        <div className="deckName">
          <Link href={`/deck?id=${deck.id}`}>
            <a href={`/deck?id=${deck.id}`}>{deck.name}</a>
          </Link>
          <div className="deckAuthor">
            by {username} <i>{dateToDeltaString(new Date(deck.created))}</i>
          </div>
        </div>
        <div className="subsection">
          <div className="factionIcons">
            {deck.factions.map(f => (
              <img key={f} src={FACTION_IMAGES[f]} />
            ))}
          </div>
          <ManaIndicator mana={10000} />
          <UpvoteIndicator votes={5000} />
        </div>
      </div>
    </>
  );
}

DeckPreview.defaultProps = {};

DeckPreview.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    factions: PropTypes.array,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string
    }),
    created: PropTypes.string
  })
};

export default DeckPreview;
