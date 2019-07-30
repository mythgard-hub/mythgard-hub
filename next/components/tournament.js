import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import DeckList from './deck-list';

const tourneyDecksQuery = gql`
  query($id: Int!, $ranks: Int = 8) {
    tournament(id: $id) {
      tournamentDecks(orderBy: RANK_ASC, first: $ranks) {
        nodes {
          rank
          deck {
            id
            name
          }
        }
      }
    }
  }
`;

Tournament.propTypes = {
  tournament: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default function Tournament({ tournament }) {
  return (
    <>
      <h1>{tournament.name}</h1>
      <h2>Decks</h2>
      <Query query={tourneyDecksQuery} variables={{ id: tournament.id }}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading decks" />;
          if (loading) return <div>Loading Decks...</div>;

          const decks = data.tournament.tournamentDecks.nodes.map(({ deck }) => deck);
          return <DeckList decks={decks} />;
        }}
      </Query>
    </>
  );
}
