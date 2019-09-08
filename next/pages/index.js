import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import NewDecks from '../components/new-decks.js';
import { useContext } from 'react';
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

        .mg-column {
          min-width: 303px;
        }

        .homePageColumns h2 {
          text-align: center;
          border-bottom: ${theme.border};
        }
      `}</style>
      <div className="homePageColumns">
        <div className="mg-column">
          <h2>Top Articles</h2>
        </div>
        <div className="mg-column">
          <h2>New Decks</h2>
          <NewDecks />
        </div>
        <div className="mg-column">
          <h2>Top Decks</h2>
        </div>
      </div>
      <div>
        <h2>patch notes</h2>
      </div>
      <div>
        <h2>tournament results</h2>
        <div>tourney 1</div>
      </div>
      <div>
        <h2>recent articles</h2>
      </div>
    </Layout>
  );
};

export default index;
