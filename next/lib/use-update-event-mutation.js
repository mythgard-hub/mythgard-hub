import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { allTournaments } from '../lib/tournament-queries.js';

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
    },
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: allTournaments }]
  });
}
