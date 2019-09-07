import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message.js';
import ManaIndicator from './mana-indicator.js';
import UpvoteIndicator from './upvote-indicator.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import Link from 'next/link';
import { FACTION_IMAGES } from '../constants/factions';
import { dateToDeltaString } from '../lib/time.js';
import {
  deckPreviewQuery as decksQuery,
  deckPreviewsToDecks
} from '../lib/deck-queries.js';

function NewDecks() {
  const { loading, error, data } = useQuery(decksQuery);
  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading...</div>;

  const theme = useContext(ThemeContext);

  let decks = (data && data.deckPreviews && data.deckPreviews.nodes) || [];
  decks = deckPreviewsToDecks(decks);

  return (
    <>
      <style jsx>{`
        .deckList {
          list-style: none;
        }

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
      <ul className="deckList">
        {decks.map((deck, i) => {
          return (
            <li key={i} className="deckPreview">
              {/* TODO - duplicate code in deck-list.js*/}
              <div className="deckName">
                <Link href={`/deck?id=${deck.id}`}>{deck.name}</Link>
                <div className="deckAuthor">
                  by{' '}
                  {(deck.author &&
                    deck.author.username &&
                    deck.author.username) ||
                    'unknown'}{' '}
                  <i>{dateToDeltaString(new Date(deck.created))}</i>
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
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewDecks;
