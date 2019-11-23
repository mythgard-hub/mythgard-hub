import gql from 'graphql-tag';
import { singleDeckQuery } from '../deck-queries';
import { ARCHETYPES, TYPES } from '../../constants/deck';

const updateDeckAndRemoveCardsMutation = gql`
  mutation UpdateDeckAndRemoveCards(
    $id: Int!
    $name: String!
    $pathId: Int
    $powerId: Int
    $archetype: [Deckarchetype]
    $type: [Decktype]
  ) {
    updateDeckAndRemoveCards(
      input: {
        _id: $id
        _name: $name
        _pathId: $pathId
        _powerId: $powerId
        _archetype: $archetype
        _type: $type
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

const updateDeckAndRemoveCards = (apolloClient, deckId, deck) => {
  const name = deck.deckName;
  const path = (deck.deckPath && deck.deckPath.id) || null;
  const power = (deck.deckPower && deck.deckPower.id) || null;
  const archetype = ARCHETYPES.find(a => a.label === deck.archetype).value;
  const type = TYPES.find(t => t.label === deck.type).value;

  return apolloClient.mutate({
    mutation: updateDeckAndRemoveCardsMutation,
    variables: {
      id: deckId,
      name: name,
      pathId: path,
      powerId: power,
      archetype: archetype,
      type: type
    },
    refetchQueries: [
      {
        query: singleDeckQuery,
        variables: { id: deckId }
      }
    ]
  });
};

export default updateDeckAndRemoveCards;
