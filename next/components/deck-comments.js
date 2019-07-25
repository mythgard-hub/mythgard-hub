import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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
    this.state = { commentBody: '', deckId: props.deck.id };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e, addCommentQuery) {
    e.preventDefault();
    addCommentQuery({
      variables: {
        deck_id: this.state.deckId,
        body: this.state.commentBody
      }
    });
    this.setState({
      commentBody: ''
    });
  }

  render() {
    return (
      <Query query={deckCommentsQuery} variables={{ id: this.props.deck.id }}>
        {({ loading, error, data: { deck } }) => {
          if (error) return <ErrorMessage message="Error loading comments." />;
          if (loading) return <div>Loading</div>;

          return (
            <>
              <h2 className="deckCommentsHeader">Comments</h2>
              <CommentList comments={deck.deckComments.nodes} />
              <CreateCommentForm
                deck={{ deck }}
                deckId={this.props.deck.id}
                deckCommentsQuery={deckCommentsQuery}
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
