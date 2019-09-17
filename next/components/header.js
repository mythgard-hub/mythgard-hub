import React from 'react';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';
import HeaderLink from './header-link';

const cdn = process.env.MG_CDN;

class Header extends React.Component {
  render() {
    let theme = this.context;
    return (
      <div className="header">
        <style jsx>{`
          .header {
            background: ${theme.background};
            padding-top: 10px;
            padding-bottom: 10px;
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
            margin-right: 15px;
          }
          .header .home .wordmark {
            width: 150px;
            vertical-align: middle;
          }
          .header .home .crownIcon {
            height: 50px;
            vertical-align: top;
          }

          @media only screen and (max-width: 600px) {
            .header {
              margin: 10px 0 25px 0;
              max-height: unset;
            }

            .header .home {
              width: 100%;
              margin-bottom: 10px;
            }
          }
        `}</style>
        <div>
          <Link href="/">
            <a data-cy="home" className="home" aria-label="home link">
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
          <HeaderLink route="/decks" cyName="decks">
            Decks
          </HeaderLink>
          <HeaderLink route="/cards" cyName="cards">
            Cards
          </HeaderLink>
          <HeaderLink route="/deck-builder" cyName="deck-builder">
            Deck Builder
          </HeaderLink>
          <HeaderLink cyName="events" route="/events">
            Events
          </HeaderLink>
          <HeaderLink route="/articles">Articles</HeaderLink>
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
