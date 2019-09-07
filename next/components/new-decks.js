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

const decksQuery = gql`
  query deckPreview {
    deckPreviews(orderBy: DECK_CREATED_DESC, first: 3) {
      nodes {
        deckName
        deckCreated
        factions
        deck {
          author {
            username
            id
          }
        }
      }
    }
  }
`;

function NewDecks() {
  const { loading, error, data } = useQuery(decksQuery);
  if (error) return <ErrorMessage message={error} />;
  if (loading) return <div>Loading...</div>;

  const theme = useContext(ThemeContext);
  let decks = (data && data.deckPreviews && data.deckPreviews.nodes) || [];
  decks = decks.map(d => {
    return {
      name: d.deckName,
      factions: d.factions,
      author: d.deck.author,
      created: d.deckCreated
    };
  });
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
        }

        .deckName {
          max-width: 257px;
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
          height: 30px;
        }

        .factionIcons {
          display: flex;
        }

        .factionIcons img {
          height: 15px;
          margin-right: 5px;
        }

        :global(.manaIndicator img) {
          height: 15px;
          max-height: 15px;
        }

        :global(.manaIndicator span) {
          font-size: 16px;
          line-height: 15px;
        }

        :global(.upvoteIndicator img) {
          height: 15px;
          max-height: 15px;
        }

        :global(.manaIndicator),
        :global(.upvoteIndicator) {
          display: block;
          height: 15px;
          line-height: 15px;
          display: flex;
          align-items: center;
        }

        :global(.upvoteIndicator span) {
          font-size: 16px;
          line-height: 15px;
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
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewDecks;
