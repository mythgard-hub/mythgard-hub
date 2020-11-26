import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

const mutation = gql`
  mutation updateEventResult(
    $pilot: String!
    $rank: Int!
    $deckId: Int!
    $id: Int!
  ) {
    updateTournamentDeck(
      input: { id: $id, patch: { rank: $rank, deckId: $deckId, pilot: $pilot } }
    ) {
      tournamentDeck {
        id
        pilot
        rank
        deckId
      }
    }
  }
`;

export default function UseUpdateEventResultMutation() {
  return useMutation(mutation, {
    update() {
      alert('Result updated succesfully');
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
