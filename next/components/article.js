import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import { dateToDeltaString } from '../lib/time';

function Article({ title, url, author, description, date }) {
  const theme = useContext(ThemeContext);
  const timeMsg = dateToDeltaString(date);
  return (
    <>
      <style jsx>{`
        .article {
          padding: 9px 12px 12px 12px;
          border: ${theme.borderAccent};
          background-color: ${theme.panelBackground};
          margin-bottom: 10px;
        }

        .article-desc,
        .article-by {
          font-size: 0.9em;
        }

        .article-link {
          text-decoration: none;
          color: ${theme.fontColorAccent};
          font-weight: 600;
          font-size: 1.1em;
        }

        .article-author {
          font-weight: 600;
        }

        .article-date {
          padding-left: 5px;
          font-style: italic;
        }
      `}</style>
      <div className="article">
        <a className="article-link" href={url}>
          {title}
        </a>
        <div className="article-by">
          by <span className="article-author">{author}</span>
          <span className="article-date">{timeMsg}</span>
        </div>
        <hr className="bgrad" />
        <div className="article-desc">{description}</div>
      </div>
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default Article;
