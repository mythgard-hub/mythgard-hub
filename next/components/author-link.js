import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function AuthorLink({ author }) {
  const theme = useContext(ThemeContext);
  const link = author
    ? `/decks?updatedTime=100000&authorName=${author}&sortBy=hot`
    : '/decks';

  return (
    <a href={link} className="authorLink" data-cy="author-link">
      <style jsx>{`
        color: ${theme.authorLinkColor};
        text-decoration: none;
        font-weight: 600;
      `}</style>
      {author}
    </a>
  );
}

AuthorLink.propTypes = {
  author: PropTypes.string
};
