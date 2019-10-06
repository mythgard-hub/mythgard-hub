import gql from 'graphql-tag';
import { deckCardsQuery } from '../deck-queries';

const addCardDeck = gql`
  mutation CreateCardDeck($deckId: Int!, $cardId: Int!, $quantity: Int!) {
    createCardDeck(
      input: {
        cardDeck: { deckId: $deckId, cardId: $cardId, quantity: $quantity }
      }
    ) {
      cardDeck {
        quantity
        deckId
        cardId
      }
    }
  }
`;

// Graphql query batching is used to prevent request flurry
const addCardsToDBDeck = (apolloClient, deckId, deckCards) => {
  return Promise.all(
    deckCards.map(deckCard => {
      apolloClient.mutate({
        mutation: addCardDeck,
        variables: {
          quantity: deckCard.quantity,
          cardId: deckCard.card.id,
          deckId
        },
        refetchQueries: [
          {
            query: deckCardsQuery,
            variables: { id: deckId }
          }
        ]
      });
    })
  );
};

export default addCardsToDBDeck;
