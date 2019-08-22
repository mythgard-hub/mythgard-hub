import Link from 'next/link';
import { ThemeContext } from './theme-context';
import withUser from './with-user';

const cdn = process.env.MG_CDN;

const linkStyle = {
  marginRight: 15
};

class Header extends React.Component {
  render() {
    let theme = this.context;
    const { user } = this.props;
    return (
      <div className="header">
        <style jsx>{`
          .header {
            background: ${theme.background};
            border-bottom: ${theme.border};
          }
        `}</style>
        <style jsx>{`
          .header {
            padding-top: 10px;
            max-height: 100px;
            overflow: hidden;
            position: fixed;
            font-weight: bold;
            max-width: 940px;
          }
          .header .home {
            display: inline-block;
            line-height: 50px;
            position: relative;
          }
          .header .home .wordmark {
            width: 150px;
            vertical-align: middle;
          }
          .header .home .crownIcon {
            height: 50px;
            vertical-align: top;
          }
          .header a {
            text-decoration: none;
          }
          .header a:before {
            content: '\u25b6';
            font-size: 80%;
            margin-right: 5px;
          }
          .header a.home:before {
            content: '';
          }
        `}</style>
        <div>
          <Link href="/">
            <a
              data-cy="home"
              className="home"
              aria-label="home link"
              style={linkStyle}
            >
              <img
                className="crownIcon"
                src={`${cdn}/mgh/MGH_CrownLogo_150.png`}
                alt="mythgard logo"
              />
              <img
                className="wordmark"
                src={`${cdn}/mgh/MGH_wordmark.svg`}
                alt="mythgard wordmark"
              />
            </a>
          </Link>
          <Link href="/decks">
            <a data-cy="decks" style={linkStyle}>
              DECKS
            </a>
          </Link>
          <Link href="/cards">
            <a data-cy="cards" style={linkStyle}>
              CARDS
            </a>
          </Link>
          <Link href="/deck-builder">
            <a data-cy="deck-builder" style={linkStyle}>
              DECK BUILDER
            </a>
          </Link>
          <Link href="/tournaments">
            <a style={linkStyle}>TOURNAMENTS</a>
          </Link>
          <Link href="/articles">
            <a style={linkStyle}>ARTICLES</a>
          </Link>
          <a href="/privacy-policy" style={linkStyle}>
            PRIVACY POLICY
          </a>
          <Link href="/auth/google">
            <a style={linkStyle}>LOG IN (GOOGLE)</a>
          </Link>
          {user && (
            <Link href="/auth/logout">
              <a style={linkStyle}>LOG OUT</a>
            </Link>
          )}
          <Link href="/account">
            <a style={linkStyle}>ACCOUNT</a>
          </Link>
        </div>
      </div>
    );
  }
}

Header.contextType = ThemeContext;

export default withUser(Header);
