import React from 'react';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';

const cdn = process.env.MG_CDN;

const linkStyle = {
  marginRight: 15
};

class Header extends React.Component {
  render() {
    let theme = this.context;
    return (
      <div className="header">
        <style jsx>{`
          .header {
            background: ${theme.background};
            padding-top: 10px;
            max-height: 100px;
            overflow: hidden;
            font-weight: bold;
            max-width: 940px;
            z-index: 2;
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
          .header a:not(.home):before {
            content: '\u25b6';
            font-size: 80%;
            margin-right: 5px;
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
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

Header.contextType = ThemeContext;

export default Header;
