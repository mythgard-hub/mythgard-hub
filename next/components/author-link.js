import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function AuthorLink({ author }) {
  const theme = useContext(ThemeContext);

  if (author === 'Mythgard Hub') return author;

  const link = author ? `/account?name=${encodeURI(author)}` : '/decks';

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
