import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

function Article({ title, url, description, date }) {
  const theme = useContext(ThemeContext);

  const now = new Date();
  const timeDelta = now.getTime() - date.getTime();
  const hrsDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24));
  const daysDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24));
  const monthsDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24 * 30));

  let timeMsg;

  if (monthsDelta > 12) {
    timeMsg = 'Over a year ago';
  } else if (monthsDelta > 1) {
    timeMsg = `${monthsDelta} months ago`;
  } else if (daysDelta > 1) {
    timeMsg = `${daysDelta} days ago`;
  } else if (hrsDelta > 1) {
    timeMsg = `${hrsDelta} hours ago`;
  } else {
    timeMsg = 'Just now';
  }

  return (
    <>
      <style jsx>{`
        .article {
          padding: 9px 12px;
          border: ${theme.borderAccent};
        }

        .article {
          margin-bottom: 10px;
        }

        .article-link {
          text-decoration: none;
          color: ${theme.fontColorAccent};
          font-weight: bold;
          font-size: 1.1em;
        }

        .article-date {
          font-style: italic;
        }
      `}</style>
      <div className="article">
        <a className="article-link" href={url}>
          {title}
        </a>
        <div className="article-date">{timeMsg}</div>
        <hr className="bgrad" />
        <div className="article-desc">{description}</div>
      </div>
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date)
};

export default Article;
