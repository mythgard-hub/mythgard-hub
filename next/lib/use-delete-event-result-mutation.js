import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });
}
