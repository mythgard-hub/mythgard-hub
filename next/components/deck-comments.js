import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './error-message';
import CommentList from './comment-list';
import CreateCommentForm from './create-comment';

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

class DeckComments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={deckCommentsQuery} variables={{ id: this.props.deck.id }}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage message="Error loading comments." />;
          if (loading) return <div>Loading</div>;

          return (
            <>
              <h2 className="deckCommentsHeader">Comments</h2>
              <CommentList comments={data.deck.deckComments.nodes} />
              <CreateCommentForm
                deck={data.deck}
                deckId={this.props.deck.id}
                deckCommentsQuery={deckCommentsQuery}
                queryData={data}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

DeckComments.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    deckComments: PropTypes.array
  }).isRequired
};

export default DeckComments;
