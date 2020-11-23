import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });
}
