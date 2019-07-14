import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return (
    <aside>
      Error: {message}
      <style jsx>{`
        aside {
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
        }
      `}</style>
    </aside>
  );
}
ErrorMessage.propTypes = {
  message: PropTypes.string
};
