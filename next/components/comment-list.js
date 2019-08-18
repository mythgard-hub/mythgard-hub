import PropTypes from 'prop-types';

export default function CommentList({ deck }) {
  return (
    <ul className="commentList" data-cy="commentList">
      {deck.deckComments.nodes.map(comment => (
        <li data-cy="comment" key={comment.id}>
          {comment.body}
        </li>
      ))}
    </ul>
  );
}
CommentList.propTypes = {
  deck: PropTypes.shape({
    deck: PropTypes.shape({
      deckComments: PropTypes.shape({
        nodes: PropTypes.array
      })
    })
  }).isRequired
};

CommentList.defaultProps = {
  comments: []
};
