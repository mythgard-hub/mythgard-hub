import Layout from '../components/layout';
import ArticleList from '../components/article-list.js';
import TopDecks from '../components/top-decks.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import { mgColors } from '../lib/theme.js';
import useConfig from '../lib/use-config.js';
import NewestDecks from '../components/newest-decks';
import MultiColumn from '../components/multi-column.js';
import BigBanner from '../components/big-banner.js';

const defaultPatchNoteUrl =
  'https://www.mythgardgame.com/permalink/patch-notes-v0-17-3---holiday-edition';
const defaultPatchVersion = '0.17.3';

const index = () => {
  const theme = useContext(ThemeContext);
  const { config } = useConfig();
  const homeBannerAd = config && config.homeBannerAd;
  const now = new Date();

  let banner = (
    <BigBanner
      href="/new-player-guide"
      src="https://cdn.mythgardhub.com/banner/npg_set3.png"
      mobileSrc="https://cdn.mythgardhub.com/banner/npg_set3_mobile.png"
    >
      NEW PLAYER GUIDE
    </BigBanner>
  );

  if (
    homeBannerAd &&
    homeBannerAd.enabled &&
    homeBannerAd.imgUrl &&
    new Date(homeBannerAd.startDate) < now &&
    new Date(homeBannerAd.endDate) > now
  ) {
    banner = (
      <a href={homeBannerAd.url}>
        <div className="promo-banner" />
      </a>
    );
  }

  const patchNoteUrl = (config && config.patchNoteUrl) || defaultPatchNoteUrl;
  const patchVersion = (config && config.patchVersion) || defaultPatchVersion;

  return (
    <Layout>
      <style jsx>{`
        :global(.newPlayerGuideBanner) {
          display: block;
          background: ${theme.background}
            url(https://cdn.mythgardhub.com/banner/npg_set3.png) no-repeat;
          height: 171px;
          padding-right: 3.5em;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          color: ${theme.background};
          font-size: 1.8em;
          font-weight: 700;
          text-align: right;
          vertical-align: middle;
          text-decoration: none;
          font-style: italic;
        }
        :global(.newPlayerGuideBanner:hover) {
          color: ${mgColors.white};
        }
        :global(.promo-banner) {
          background-image: url(${homeBannerAd && homeBannerAd.imgUrl});
          background-size: contain;
          background-repeat: no-repeat;
          width: 100%;
          height: 0;
          padding-top: 16%;
        }
        @media only screen and (max-width: 575.98px) {
          .mg-column {
            width: 100%;
            flex: none;
          }

          .mg-column + .mg-column {
            margin-left: 0;
          }

          .newPlayerGuideBanner {
            height: 70px;
            text-shadow: 0px 0px 6px #000;
          }
        }
      `}</style>
      {banner}
      <MultiColumn>
        <div className="mg-column">
          <h2>Recent Media</h2>
          <hr className="orangeGrade" />
          <ArticleList max={3} />
        </div>
        <div className="mg-column">
          <h2>Newest Decks</h2>
          <hr className="orangeGrade" />
          <NewestDecks />
        </div>
        <div className="mg-column">
          <h2>Featured Decks</h2>
          <hr className="orangeGrade" />
          <TopDecks />
        </div>
      </MultiColumn>
      <style jsx>{`
        .patchNotes {
          padding-bottom: ${theme.spacing / 2}px;
        }
        .patchNotes a {
          text-decoration: none;
        }
        .patchNotes :global(.page-banner) {
          height: 134px;
        }
        .patchNotes :global(.page-banner) .patchNotes__v {
          text-transform: lowercase;
        }
      `}</style>

      <BigBanner
        href={patchNoteUrl}
        src="https://cdn.mythgardhub.com/banner/patchnotes_set3.png"
        mobileSrc="https://cdn.mythgardhub.com/banner/patchnotes_set3_mobile.png"
      >
        <div>
          Latest Patch Notes
          <br />
          <span className="patchNotes__v">v</span>
          {patchVersion}
        </div>
      </BigBanner>
    </Layout>
  );
};

export default index;
