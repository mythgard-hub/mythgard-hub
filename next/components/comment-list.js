import PropTypes from 'prop-types';

export default function CommentList({ comments }) {
  return (
    <ul className="commentList" data-cy="commentList">
      {comments.map(comment => (
        <li data-cy="comment" key={comment.id}>
          {comment.body}
        </li>
      ))}
    </ul>
  );
}
CommentList.propTypes = {
  comments: PropTypes.array
};
