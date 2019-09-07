import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import Link from 'next/link';

const decksQuery = gql`
  query decks {
    decks(orderBy: CREATED_DESC, first: 3) {
      nodes {
        id
        name
        created
        author {
          id
          username
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
  const decks = (data && data.decks && data.decks.nodes) || [];
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
                  {deck.created}
                </div>
                <div className="subsection">hello</div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewDecks;
