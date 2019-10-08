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
            padding-top: 13px;
            font-weight: bold;
            max-width: 940px;
            z-index: 2;
            display: flex;
            align-items: center;
          }
          .header .home {
            display: flex;
            position: relative;
            margin-right: 15px;
            align-items: center;
          }
          .header .home .wordmark {
            width: 205px;
          }
          .header .home .crownIcon {
            width: 80px;
            vertical-align: top;
            position: relative;
            top: -3px;
            left: -5px;
          }

          .wordmarkWrapper {
            height: 26px;
            position: relative;
          }

          .wordmarkWrapper:after {
            content: 'BETA';
            top: -20px;
            right: -33px;
            position: absolute;
            color: #ce0000;
          }

          @media only screen and (max-width: 600px) {
            .header {
              margin: 10px 0 25px 0;
              max-height: unset;
              flex-direction: column;
            }

            .header .home {
              width: 100%;
              margin-bottom: 10px;
            }
          }
        `}</style>
        <Link href="/">
          <a data-cy="home" className="home" aria-label="home link">
            <img
              className="crownIcon"
              src={`${cdn}/mgh/MGH_CrownLogo_150.png`}
              alt="mythgard logo"
            />
            <picture className="wordmarkWrapper">
              <img
                className="wordmark"
                src={`${cdn}/mgh/MGH_wordmark.svg`}
                alt="mythgard wordmark"
              />
            </picture>
          </a>
        </Link>
        <HeaderLink route="/cards" cyName="cards">
          Cards
        </HeaderLink>
        <HeaderLink route="/decks" cyName="decks">
          Decks
        </HeaderLink>
        <HeaderLink route="/deck-builder" cyName="deck-builder">
          Deck Builder
        </HeaderLink>
        <HeaderLink cyName="events" route="/events">
          Events
        </HeaderLink>
        <HeaderLink route="/articles">Media</HeaderLink>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

Header.contextType = ThemeContext;

export default Header;
