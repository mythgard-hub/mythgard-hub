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
          nav {
            width: 100%;
          }
          .header {
            background: ${theme.background};
            padding: ${theme.spacing / 2}px 0;
            font-weight: bold;
            z-index: 2;
            display: flex;
            align-items: center;
          }
          .header .home {
            display: flex;
            position: relative;
            align-items: center;
          }
          .header .home .wordmark {
            width: 205px;
          }
          @media only screen and (min-width: 576px) {
            .header .home {
              margin-right: 35px;
            }
          }
          .header .home .crownIcon {
            width: 80px;
            height: 69px;
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

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          @media only screen and (max-width: 575.98px) {
            .header {
              flex-direction: column;
            }

            .header .home {
              width: 100%;
              margin-bottom: ${theme.spacing / 2}px;
            }

            ul {
              flex-wrap: wrap;
            }
            li {
              /*flex: 1 0 50%;*/
              text-align: center;
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
        <nav>
          <ul>
            <li>
              <HeaderLink route="/cards" cyName="cards">
                Cards
              </HeaderLink>
            </li>
            <li>
              <HeaderLink route="/decks" cyName="decks">
                Decks
              </HeaderLink>
            </li>
            <li>
              <HeaderLink route="/deck-builder" cyName="deck-builder">
                Deck Builder
              </HeaderLink>
            </li>
            <li style={{ display: 'none' }}>
              <HeaderLink cyName="spoilers" route="/spoilers">
                Spoilers
              </HeaderLink>
            </li>
            <li>
              <HeaderLink cyName="events" route="/events">
                Events
              </HeaderLink>
            </li>
            <li>
              {' '}
              <HeaderLink route="/articles">Media</HeaderLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

Header.contextType = ThemeContext;

export default Header;
