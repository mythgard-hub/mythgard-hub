import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import NewDecks from '../components/new-decks.js';
import ArticleList from '../components/article-list.js';
import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../components/theme-context.js';

const index = () => {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <PageBanner image={PageBanner.IMG_HOME_TOP}></PageBanner>
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
      <div className="homePageColumns">
        <div className="mg-column">
          <h2>Top Articles</h2>
          <ArticleList max={3} />
        </div>
        <div className="mg-column">
          <h2>New Decks</h2>
          <NewDecks />
        </div>
        <div className="mg-column">
          <h2>Top Decks</h2>
        </div>
      </div>
      <style jsx>{`
        .patchNotes a {
          text-decoration: none;
        }
        .patchNotes :global(.page-banner) {
          height: 134px;
        }
      `}</style>
      <div className="patchNotes">
        <Link href="/patchNotes">
          <a>
            <PageBanner image={PageBanner.IMG_PATCH_NOTES}>
              Latest Patch Notes
              <br />
              v0.0.1
            </PageBanner>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default index;
