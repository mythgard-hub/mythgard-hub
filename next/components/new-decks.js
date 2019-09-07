import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import ErrorMessage from './error-message.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';

const decksQuery = gql`
  query decks {
    decks(orderBy: CREATED_DESC, first: 3) {
      nodes {
        id
        name
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
          border: ${theme.border};
          display: block;
        }
      `}</style>
      <ul className="deckList">
        {decks.map((deck, i) => {
          return (
            <li key={i} className="deckPreview">
              {deck.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewDecks;
