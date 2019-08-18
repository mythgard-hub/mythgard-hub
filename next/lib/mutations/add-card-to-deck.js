import gql from 'graphql-tag';

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
        }
      });
    })
  );
};

export default addCardsToDBDeck;
