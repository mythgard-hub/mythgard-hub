import React from 'react';
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

export const addCommentQuery = gql`
  mutation CreateDeckComment($deck_id: Int!, $body: String!) {
    createDeckComment(
      input: { deckComment: { deckId: $deck_id, body: $body } }
    ) {
      deckComment {
        body
        id
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

  handleSubmit(e, refetchFn) {
    e.preventDefault();
    refetchFn();
  }

  render() {
    return (
      <Query query={deckCommentsQuery} variables={{ id: this.props.deck.id }}>
        {({ loading, error, data: { deck }, refetch }) => {
          if (error) return <ErrorMessage message="Error loading comments." />;
          if (loading) return <div>Loading</div>;

          return (
            <>
              <h2 className="deckCommentsHeader">Comments</h2>
              <CommentList comments={deck.deckComments.nodes} />
              <form>
                <label>
                  Add a comment:
                  <input
                    type="text"
                    value={this.state.commentBody}
                    name="commentBody"
                    className="commentBody"
                    onChange={this.handleInputChange}
                  />
                </label>
                <br />
                <br />
                <input
                  type="submit"
                  value="Submit"
                  onClick={e => {
                    this.handleSubmit(e, refetch);
                  }}
                />
              </form>
            </>
          );
        }}
      </Query>
    );
  }
}

DeckComments.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string,
    deckComments: PropTypes.array
  }).isRequired
};

export default DeckComments;
