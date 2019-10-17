import gql from 'graphql-tag';

export const upcomingTournaments = gql`
  query tournaments($now: Date) {
    tournaments(
      orderBy: DATE_ASC
      first: 3
      filter: { date: { greaterThanOrEqualTo: $now } }
    ) {
      nodes {
        id
        name
        organizer
        date
        url
      }
    }
  }
`;

export const completedTournaments = gql`
  query tournaments($now: Date) {
    tournaments(orderBy: DATE_DESC, filter: { date: { lessThan: $now } }) {
      nodes {
        id
        name
        organizer
        date
        url
      }
    }
  }
`;

export const tournamentWithResultsQuery = gql`
  query tournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      url
      date
      organizer
      tournamentDecks {
        nodes {
          rank
          pilot
          deck {
            name
            id
            deckPreviews {
              nodes {
                factions
                essenceCost
              }
            }
          }
        }
      }
    }
  }
`;
