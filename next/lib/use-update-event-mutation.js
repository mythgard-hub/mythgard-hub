import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const mutation = gql`
  mutation updateEvent(
    $id: Int!
    $name: String!
    $url: String!
    $organizer: String!
    $date: Date!
  ) {
    updateTournament(
      input: {
        id: $id
        patch: { name: $name, url: $url, organizer: $organizer, date: $date }
      }
    ) {
      tournament {
        id
        name
        url
        organizer
        date
      }
    }
  }
`;

export default function UseUpdateEventMutation() {
  return useMutation(mutation, {
    update() {
      alert('The event was updated successfully');
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });
}
