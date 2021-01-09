import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

const mutation = gql`
  mutation deleteEventResult($id: Int!) {
    deleteTournamentDeck(input: { id: $id }) {
      deletedTournamentDeckNodeId
    }
  }
`;

export default function UseDeleteEventResultMutation() {
  return useMutation(mutation, {
    update() {
      alert('Result deleted succesfully');
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
