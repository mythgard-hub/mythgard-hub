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
      <style jsx global>{`
        .article {
          padding: 9px 12px;
          border: ${theme.borderAccent};
        }

        .article + .article {
          margin-top: 10px;
        }

        .article-link {
          color: ${theme.font};
        }

        .article-date {
          font-style: italic;
        }

        .article-divider {
          border-top: ${theme.borderAccent};
          -webkit-mask-image: -webkit-gradient(
            linear,
            left top,
            right bottom,
            from(rgba(0, 0, 0, 0)),
            to(rgba(0, 0, 0, 1))
          );
        }
      `}</style>
      <div className="article">
        <a className="article-link" href={url}>
          {title}
        </a>
        <div className="article-date">{timeMsg}</div>
        <hr className="article-divider" />
        <div className="article-desc">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
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
