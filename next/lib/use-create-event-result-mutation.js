import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

const mutation = gql`
  mutation createEventResult(
    $pilot: String!
    $rank: Int!
    $deckId: Int!
    $eventId: Int!
  ) {
    createTournamentDeck(
      input: {
        tournamentDeck: {
          rank: $rank
          deckId: $deckId
          pilot: $pilot
          tournamentId: $eventId
        }
      }
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

export default function UseCreateSingleEventMutation() {
  return useMutation(mutation, {
    update() {
      alert('Result created successfully');
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
