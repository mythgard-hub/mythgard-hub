import gql from 'graphql-tag';
import { ARCHETYPES, TYPES } from '../../constants/deck';

const addDeckMutation = gql`
  mutation AddDeck(
    $name: String!
    $pathId: Int
    $powerId: Int
    $authorId: Int
    $archetype: [Deckarchetype]
    $type: [Decktype]
  ) {
    createDeck(
      input: {
        deck: {
          name: $name
          pathId: $pathId
          powerId: $powerId
          authorId: $authorId
          archetype: $archetype
          type: $type
        }
      }
    ) {
      deck {
        id
        name
        author {
          id
          username
        }
        path {
          id
          name
        }
        power {
          id
          name
        }
        archetype
        type
      }
    }
  }
`;

const createNewEmptyDeck = (apolloClient, deck, authorId) => {
  const path = (deck.deckPath && deck.deckPath.id) || null;
  const power = (deck.deckPower && deck.deckPower.id) || null;
  const archetype = ARCHETYPES.find(a => a.label === deck.archetype).value;
  const type = TYPES.find(t => t.label === deck.type).value;

  return apolloClient.mutate({
    mutation: addDeckMutation,
    variables: {
      name: deck.deckName,
      pathId: path,
      powerId: power,
      authorId,
      archetype,
      type
    }
  });
};

export default createNewEmptyDeck;
