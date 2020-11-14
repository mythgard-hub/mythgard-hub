import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const mutation = gql`
  mutation createEvent(
    $name: String!
    $url: String!
    $organizer: String!
    $date: Date!
  ) {
    createTournament(
      input: {
        tournament: {
          name: $name
          url: $url
          organizer: $organizer
          date: $date
        }
      }
    ) {
      tournament {
        name
        url
        organizer
        date
      }
    }
  }
`;

export default function UseCreateEventMutation() {
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
