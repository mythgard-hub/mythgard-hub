import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const mutation = gql`
  mutation createEvent($name: String!) {
    createTournament(input: { tournament: { name: $name } }) {
      tournament {
        name
      }
    }
  }
`;

export default function() {
  return useMutation(mutation, {
    update() {
      alert('The event was created successfully');
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });
}
