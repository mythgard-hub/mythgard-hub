import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './error-message';
import CardList from './card-list';

export const allCardsQuery = gql`
  query allCards {
    allCards {
      nodes {
        id
        name
      }
    }
  }
`;

export default function AllCards() {
  return (
    <Query query={allCardsQuery}>
      {({ loading, error, data: { allCards } }) => {
        if (error) return <ErrorMessage message={error} />;
        if (loading) return <div>Loading</div>;

        return <CardList cards={allCards.nodes} />;
      }}
    </Query>
  );
}
