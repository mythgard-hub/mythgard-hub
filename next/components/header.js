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
    <div className="ad-placeholder">Ad placeholder</div>
    <div>
      <Link href="/">
        <a className="home" style={linkStyle}>
          Mythgard Hub
        </a>
      </Link>
      <Link href="/decks">
        <a className="decks" style={linkStyle}>
          Decks
        </a>
      </Link>
      <Link href="/cards">
        <a className="cards" style={linkStyle}>
          Cards
        </a>
      </Link>
      <Link href="/deckbuilder">
        <a style={linkStyle}>DeckBuilder</a>
      </Link>
      <Link href="/tournaments">
        <a style={linkStyle}>Tournaments</a>
      </Link>
      <Link href="/articles">
        <a style={linkStyle}>Articles</a>
      </Link>
    </div>
  </div>
);

export default Header;
