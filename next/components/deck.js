import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import DeckCardList from './deck-card-list';
import DeckExport from './deck-export';
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

const getDeckToExport = (deckCards, deckName, path = null, power = null) => {
  const deckToExport = initializeDeckBuilder();
  deckToExport.deckName = deckName;
  deckToExport.deckPath = path ? path.name : '';
  deckToExport.deckPower = power ? power.name : '';
  deckToExport.mainDeck = {
    ...deckCards
  };

  return deckToExport;
};

export default function Deck({ deck }) {
  return (
    <Query query={deckCardsQuery} variables={{ id: deck.id }}>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        const cards = data.deck.cardDecks.nodes;
        const { power, path } = deck;
        const deckToExport = getDeckToExport(cards, deck.name, path, power);

        return (
          <>
            <h1 className="deckName">{deck.name}</h1>
            <h2>Power</h2>
            {power ? power.name : 'No Power Selected'}
            <h2>Path</h2>
            {path ? path.name : 'No Path Selected'}
            <h2>Cards</h2>
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
    cardDecks: PropTypes.array,
    power: PropTypes.shape({ name: PropTypes.string.isRequired }),
    path: PropTypes.shape({ name: PropTypes.string.isRequired })
  }).isRequired
};
