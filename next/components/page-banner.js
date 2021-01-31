import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';
import Link from 'next/link';

function PageBanner({ children, image, url }) {
  return typeof url !== 'undefined'
    ? _bannerWithLink(children, image, url)
    : _bannerWithoutLink(children, image);
}

function _bannerWithoutLink(children, backgroundImage) {
  const theme = useContext(ThemeContext);

  return (
    <div className="page-banner">
      <style jsx>{`
        .page-banner {
          border-top: ${theme.border};
          border-bottom: ${theme.border};
          background: url(${backgroundImage}) left no-repeat,
            ${theme.background};
          background-position: right;
          background-size: cover;
          height: 70px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .page-banner h1 {
          margin: 0;
          padding-right: 0.5em;
          text-align: right; /* multiline situations */
          font-style: italic;
          text-align: center;
          white-space: nowrap;
        }

        .spacer1 {
          flex-basis: 536px;
          flex-grow: 0;
        }

        .spacer2 {
          min-width: 90px;
          flex-grow: 0;
        }

        @media only screen and (max-width: 600px) {
          .page-banner .spacer2 {
          }
        }
      `}</style>
      <span className="spacer1"></span>
      <h1 data-cy="header">{children}</h1>
      <span className="spacer2"></span>
    </div>
  );
}

function _bannerWithLink(children, backgroundImage, url) {
  const theme = useContext(ThemeContext);

  return (
    <Link href={url}>
      <a className="page-banner-link">
        <style jsx>{`
          .page-banner-link {
            text-decoration: none;
          }

          .page-banner {
            border-top: ${theme.border};
            border-bottom: ${theme.border};
            background: url(${backgroundImage}) left no-repeat,
              ${theme.background};
            height: 70px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .spacer1 {
            min-width: 536px;
            flex-grow: 0;
          }

          .spacer2 {
            min-width: 90px;
            flex-grow: 0;
          }

          .page-banner h1 {
            margin: 0;
            padding-right: 0.5em;
            text-align: right; /* multiline situations */
          }

          @media only screen and (max-width: 600px) {
            .page-banner {
              background: unset;
            }
          }
        `}</style>

        <div className="page-banner">
          <span className="spacer1"></span>
          <h1 data-cy="header">{children}</h1>
          <span className="spacer2"></span>
        </div>
      </a>
    </Link>
  );
}

PageBanner.IMG_ARTICLES = `${process.env.MG_CDN}/banner/media_set3.png`;
PageBanner.IMG_CARDS = `${process.env.MG_CDN}/banner/cards_set3.png`;
PageBanner.IMG_DECKS = `${process.env.MG_CDN}/banner/decks_set3.png`;
PageBanner.IMG_DECK_BUILDER = `${process.env.MG_CDN}/banner/deckbuilder_set3.png`;
PageBanner.IMG_EVENTS = `${process.env.MG_CDN}/banner/events_set3.png`;

PageBanner.propTypes = {
  children: PropTypes.any,
  url: PropTypes.string,
  image: PropTypes.oneOf([
    PageBanner.IMG_ARTICLES,
    PageBanner.IMG_CARDS,
    PageBanner.IMG_DECKS,
    PageBanner.IMG_DECK_BUILDER,
    PageBanner.IMG_EVENTS,
    PageBanner.IMG_PATCH_NOTES,
    PageBanner.IMG_HOME_TOP
  ]).isRequired
};

export default PageBanner;
