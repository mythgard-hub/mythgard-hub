import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import { dateToDeltaString } from '../lib/time';

function Article({ title, url, description, date }) {
  const theme = useContext(ThemeContext);
  const timeMsg = dateToDeltaString(date);
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
  date: PropTypes.instanceOf(Date).isRequired
};

export default Article;
