import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';
import Link from 'next/link';

function PageBanner({ children, image, url }) {
  return (
    (typeof(url) !== 'undefined')
    ? _bannerWithLink(children, image, url)
    : _bannerWithoutLink(children, image)
  );
}

function _bannerWithoutLink(children, backgroundImage){
  const theme = useContext(ThemeContext);

  return (
    <div className="page-banner">
      <style jsx>{`
        .page-banner {
          border-top: ${theme.border};
          border-bottom: ${theme.border};
          background: url(${backgroundImage}) left no-repeat, ${theme.background};
          height: 70px;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
        }
        .page-banner h1 {
          margin: 0;
          padding-right: 0.5em;
          text-align: right; /* multiline situations */
        }

        @media only screen and (max-width: 600px) {
          .page-banner {
            background-position: center;
            text-shadow: 0px 0px 6px #000;
          }
        }
      `}</style>
      <h1 data-cy="header">{children}</h1>
    </div>
  );
}

function _bannerWithLink(children, backgroundImage, url){
  const theme = useContext(ThemeContext);

  return (
    <Link href={url}>
      <a className='page-banner-link'>
        <style jsx>{`
          .page-banner-link { text-decoration: none; }

          .page-banner {
            border-top: ${theme.border};
            border-bottom: ${theme.border};
            background: url(${backgroundImage}) left no-repeat, ${theme.background};
            height: 70px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
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
          <h1 data-cy="header">{children}</h1>
        </div>
      </a>
    </Link>
  );
}

PageBanner.IMG_ARTICLES = `${process.env.MG_CDN}/banner/Banner_Articles.jpg`;
PageBanner.IMG_CARDS = `${process.env.MG_CDN}/banner/Banner_Cards.jpg`;
PageBanner.IMG_DECKS = `${process.env.MG_CDN}/banner/Banner_Decks.jpg`;
PageBanner.IMG_DECK_BUILDER = `${process.env.MG_CDN}/banner/Banner_DeckBuilder.jpg`;
PageBanner.IMG_EVENTS = `${process.env.MG_CDN}/banner/Banner_Events.jpg`;
PageBanner.IMG_PATCH_NOTES = `${process.env.MG_CDN}/banner/Banner_PatchNotes.jpg`;
PageBanner.IMG_HOME_TOP = `${process.env.MG_CDN}/banner/Banner_Home_Top.jpg`;

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
