import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import ErrorMessage from './error-message';
import { handleInputChange } from '../lib/form-utils';

const addCommentQuery = gql`
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

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentBody: '' };

    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  handleSubmit(e, addCommentQuery) {
    e && e.preventDefault();
    addCommentQuery({
      variables: {
        deck_id: this.props.deckId,
        body: this.state.commentBody
      }
    });
    this.setState({
      commentBody: ''
    });
  }

  // prettier-ignore
  updateCache( cache, { data: { createDeckComment } }) {
    const variables = { id: this.props.deckId };
    const query = this.props.deckCommentsQuery;

    const data = cache.readQuery({ query, variables });

    data.deck.deckComments.nodes = [ createDeckComment, ...data.deck.deckComments.nodes];

    cache.writeQuery({ query, data, variables });
  }

  render() {
    return (
      <Mutation mutation={addCommentQuery} update={this.updateCache}>
        {(addComment, { loading, error }) => {
          if (error) return <ErrorMessage message="Error Saving comments." />;
          if (loading) return <div>Loading</div>;
          return (
            <form>
              <label>
                Add a comment:
                <input
                  type="text"
                  value={this.state.commentBody}
                  name="commentBody"
                  className="commentBody"
                  data-cy="commentBody"
                  onChange={this.handleInputChange}
                />
              </label>
              <br />
              <br />
              <input
                type="submit"
                value="Submit"
                data-cy="submit"
                onClick={e => {
                  this.handleSubmit(e, addComment);
                }}
              />
            </form>
          );
        }}
      </Mutation>
    );
  }
}

CreateComment.propTypes = {
  deckId: PropTypes.number,
  deckCommentsQuery: PropTypes.object,
  deck: PropTypes.shape({
    deck: PropTypes.shape({
      deckComments: PropTypes.shape({
        nodes: PropTypes.array
      })
    })
  }).isRequired,
  queryData: PropTypes.object.isRequired
};

export default CreateComment;
