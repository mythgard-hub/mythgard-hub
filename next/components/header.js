import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const headerStyle = {
  maxHeight: '50px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'fixed'
};

const Header = () => (
  <div className="header" style={headerStyle}>
    <div>
      <Link href="/">
        <a data-cy="home" style={linkStyle}>
          Mythgard Hub
        </a>
      </Link>
      <Link href="/decks">
        <a data-cy="decks" style={linkStyle}>
          Decks
        </a>
      </Link>
      <Link href="/cards">
        <a data-cy="cards" style={linkStyle}>
          Cards
        </a>
      </Link>
      <Link href="/deck-builder">
        <a data-cy="deck-builder" style={linkStyle}>
          DeckBuilder
        </a>
      </Link>
      <Link href="/tournaments">
        <a style={linkStyle}>Tournaments</a>
      </Link>
      <Link href="/articles">
        <a style={linkStyle}>Articles</a>
      </Link>
      <a href="/privacy-policy" style={linkStyle}>
        Privacy Policy
      </a>
      <Link href="/auth/google">
        <a style={linkStyle}>Log In (Google)</a>
      </Link>
      <Link href="/auth/logout">
        <a style={linkStyle}>Log Out</a>
      </Link>
    </div>
  </div>
);

export default Header;
