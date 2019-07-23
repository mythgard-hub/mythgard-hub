import PropTypes from 'prop-types';

export default function CommentList({ comments }) {
  return (
    <ul className="commentList">
      {comments.map(comment => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  );
}
CommentList.propTypes = {
  comments: PropTypes.array
};
