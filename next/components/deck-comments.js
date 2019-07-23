import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import CommentList from './comment-list';

export const deckCommentsQuery = gql`
  query($id: Int!) {
    deck(id: $id) {
      deckComments {
        nodes {
          body
          id
        }
      }
    }
  }
`;

export default function DeckComments({ deck }) {
  return (
    <Query query={deckCommentsQuery} variables={{ id: deck.id }}>
      {({ loading, error, data: { deck } }) => {
        if (error) return <ErrorMessage message="Error loading comments." />;
        if (loading) return <div>Loading</div>;

        return (
          <>
            <h2 className="deckCommentsHeader">Comments</h2>
            <CommentList comments={deck.deckComments.nodes} />
          </>
        );
      }}
    </Query>
  );
}
DeckComments.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string,
    deckComments: PropTypes.array
  }).isRequired
};
