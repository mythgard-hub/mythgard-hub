import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import ArticleList from '../components/article-list.js';
import TopDecks from '../components/top-decks.js';
import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../components/theme-context.js';
import { mgColors } from '../lib/theme.js';

const index = () => {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <style jsx>{`
        .homePageColumns {
          display: flex;
          flex-wrap: wrap;
          min-width: 284px;
          margin: 0 -20px;
        }

        .mg-column + .mg-column {
          padding-left: 40px;
        }

        .mg-column {
          flex: 1;
        }

        .homePageColumns h2 {
          text-align: center;
          border-bottom: ${theme.border};
        }

        .newPlayerGuideBanner {
          clear: both;
          margin-top: 15px;
          float: left;
          border-top: ${theme.border};
          border-bottom: ${theme.border};
          width: 874px;
        }

        .newPlayerGuideBannerImage {
          z-index: -1;
          float: left;
          margin-bottom: 1px;
        }

        .newPlayerGuideBannerText {
          color: ${theme.fontColorHeading};
          font-size: 2em;
          font-weight: 700;
          margin-top: 25px;
          text-align: right;
          vertical-align: middle;
        }

        .bannerLink {
          color: ${theme.fontColorHeading};
          text-decoration: none;
        }

        a.bannerLink:hover {
          color: ${mgColors.orange};
        }

        @media only screen and (max-width: 600px) {
          .mg-column {
            width: 100%;
            flex: none;
          }

          .mg-column + .mg-column {
            padding-left: 0;
          }
        }
      `}</style>
      <div className="newPlayerGuideBanner">
        <Link href="/new-player-guide">
          <a className="bannerLink">
            <img
              className="newPlayerGuideBannerImage"
              src="https://cdn.mythgardhub.com/banner/Banner_Bulwark.jpg"
            />
          </a>
        </Link>
        <div className="newPlayerGuideBannerText">
          <Link href="/new-player-guide">
            <a className="bannerLink">New Player Guide</a>
          </Link>
        </div>
      </div>
      <div className="homePageColumns">
        <div className="mg-column">
          <h2>Top Articles</h2>
          <ArticleList max={3} />
        </div>
        <div className="mg-column">
          <h2>Top Decks</h2>
          <TopDecks />
        </div>
      </div>
      <style jsx>{`
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
      <div className="patchNotes">
        <a href="https://www.mythgardgame.com/permalink/patch-notes-v0-16-1">
          <PageBanner image={PageBanner.IMG_PATCH_NOTES}>
            Latest Patch Notes
            <br />
            <span className="patchNotes__v">v</span>0.16.1
          </PageBanner>
        </a>
      </div>
    </Layout>
  );
};

export default index;
