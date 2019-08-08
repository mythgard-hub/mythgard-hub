import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import DeckCardList from './deck-card-list';
import DeckExport from './deck-export';

import { exportDeck } from '../lib/export-utils';
import { initializeDeckBuilder } from '../lib/deck-utils';

export const deckCardsQuery = gql`
  query($id: Int!) {
    deck(id: $id) {
      id
      name
      cardDecks {
        nodes {
          quantity
          card {
            name
            id
          }
        }
      }
    }
  }
`;

const deckToExportText = (deckCards, deckName) => {
  const deckToExport = initializeDeckBuilder();
  deckToExport.deckName = deckName;
  deckToExport.mainDeck = {
    ...deckCards
  };

  return deckToExport;
};

export default function Deck({ deck }) {
  return (
    <Query query={deckCardsQuery} variables={{ id: deck.id }}>
      {({ loading, error, data: { deck } }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        const cards = deck.cardDecks.nodes;
        const deckToExport = deckToExportText(cards, deck.name);

        return (
          <>
            <h1 className="deckName">{deck.name}</h1>
            <DeckCardList deckCards={cards} />
            <DeckExport deckInProgress={deckToExport} />
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
