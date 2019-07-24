import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import CardList from './card-list';

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
            <CardList cards={deck.cardDecks.nodes.map(({ card }) => card)} />
          </>
        );
      }}
    </Query>
  );
}
Deck.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cardDecks: PropTypes.array
  }).isRequired
};
