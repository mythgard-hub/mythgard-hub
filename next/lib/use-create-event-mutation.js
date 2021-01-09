import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

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
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
