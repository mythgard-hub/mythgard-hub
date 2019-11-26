import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import ArticleList from '../components/article-list.js';
import TopDecks from '../components/top-decks.js';
import { useContext } from 'react';
import { ThemeContext } from '../components/theme-context.js';
import { mgColors } from '../lib/theme.js';
import Link from 'next/link';

const index = () => {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <style jsx>{`
        .homePageColumns {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
        }

        .mg-column + .mg-column {
          margin-left: ${theme.spacing * 2}px;
        }

        .mg-column {
          flex: 1;
        }

        .homePageColumns h2 {
          text-align: center;
          font-size: 1.2em;
          font-weight: 700;
          font-style: italic;
          text-transform: uppercase;
        }

        .newPlayerGuideBanner {
          display: block;
          border-top: ${theme.border};
          border-bottom: ${theme.border};
          background: ${theme.background}
            url(https://cdn.mythgardhub.com/banner/Banner_Bulwark.jpg) no-repeat;
          height: 136px;
          padding-right: 0.5em;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          color: ${theme.fontColorHeading};
          font-size: 1.8em;
          font-weight: 700;
          text-align: right;
          vertical-align: middle;
          text-decoration: none;
        }
        .newPlayerGuideBanner:hover {
          color: ${mgColors.orange};
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
      <Link href="/new-player-guide">
        <a className="newPlayerGuideBanner">New Player Guide</a>
      </Link>
      <div className="homePageColumns">
        <div className="mg-column">
          <h2>Top Media</h2>
          <hr className="orangeGrade" />
          <ArticleList max={3} />
        </div>
        <div className="mg-column">
          <h2>Featured Decks</h2>
          <hr className="orangeGrade" />
          <TopDecks />
        </div>
      </div>
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
      <div className="patchNotes">
        <a href="https://www.mythgardgame.com/permalink/patch-notes-v0-17-2">
          <PageBanner image={PageBanner.IMG_PATCH_NOTES}>
            Latest Patch Notes
            <br />
            <span className="patchNotes__v">v</span>0.17.2
          </PageBanner>
        </a>
      </div>
    </Layout>
  );
};

export default index;
