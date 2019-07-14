import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import DeckList from './deck-list';

export const allDecksQuery = gql`
  query allDecks {
    allDecks {
      nodes {
        id
        name
      }
    }
  }
`;

export default function DecksList() {
  return (
    <Query query={allDecksQuery}>
      {({ loading, error, data: { allDecks } }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        return <DeckList decks={allDecks.nodes} />;
      }}
    </Query>
  );
}
