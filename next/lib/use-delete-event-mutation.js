import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

const mutation = gql`
  mutation deleteEvent($id: Int!) {
    deleteTournament(input: { id: $id }) {
      deletedTournamentNodeId
    }
  }
`;

export default function UseDeleteEventMutation() {
  return useMutation(mutation, {
    update() {
      alert('Event deleted succesfully');
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
