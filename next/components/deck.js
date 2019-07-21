import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import Link from 'next/link';

export const deckCardsQuery = gql`
  query($id: Int!) {
    deck(id: $id) {
      id
      name
      cardDecks {
        nodes {
          card {
            name
            id
          }
        }
      }
    }
  }
`;

export default function Deck({ deck }) {
  return (
    <Query query={deckCardsQuery} variables={{ id: deck.id }}>
      {({ loading, error, data: { deck } }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        return (
          <>
            <h1 className="deckName">{deck.name}</h1>
            <ul className="deckList">
              {deck.cardDecks.nodes.map(({ card }) => (
                <li key={card.id}>
                  <Link href={`/card?id=${card.id}`}>
                    <a>{card.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        );
      }}
    </Query>
  );
}
Deck.propTypes = {
  deck: PropTypes.object.isRequired
};
