import React from 'react';
import EssenceIndicator from './essence-indicator.js';
import UpvoteIndicator from './upvote-indicator.js';
import FactionsIndicator from './factions-indicator.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import Link from 'next/link';
import { dateToDeltaString } from '../lib/time.js';
import PropTypes from 'prop-types';
import AuthorLink from './author-link.js';

function DeckPreview({ deck, hideDate }) {
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

        :global(.essenceIndicator),
        :global(.upvoteIndicator),
        .factionIcons {
          display: block;
          height: 20px;
          display: flex;
          align-items: center;
        }

        .factionIcons img,
        :global(.essenceIndicator img),
        :global(.upvoteIndicator img) {
          height: 15px;
          max-height: 15px;
        }

        :global(.essenceIndicator .deckEssenceCell),
        :global(.upvoteIndicator .deckVotesCell) {
          font-size: 16px;
        }

        @media only screen and (max-width: 600px) {
          .deckPreview {
            max-width: unset;
          }
        }
      `}</style>

      <div data-cy="deckPreview" className="deckPreview">
        {/* TODO - duplicate code in deck-list.js*/}
        <div className="deckName">
          <Link href={`/deck?id=${deck.id}`}>
            <a href={`/deck?id=${deck.id}`}>{deck.name}</a>
          </Link>
        </div>
        <div className="deckAuthor">
          by <AuthorLink author={username} />{' '}
          {!hideDate && <i>{dateToDeltaString(new Date(deck.created))}</i>}
        </div>
        <div className="subsection">
          <FactionsIndicator factions={deck.factions} />
          <EssenceIndicator essence={deck.essenceCost} />
          <UpvoteIndicator votes={deck.votes} />
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
    essenceCost: PropTypes.number,
    votes: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string
    }),
    created: PropTypes.string
  }),
  hideDate: PropTypes.bool
};

export default DeckPreview;
