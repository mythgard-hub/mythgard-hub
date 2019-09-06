import Layout from '../components/layout';
import ArticleList from '../components/article-list';

const index = () => (
  <Layout>
    <hr />
    <div>
      <span>
        <b>Top Articles</b>
      </span>
      <span>
        <b>New Decks</b>
      </span>
      <span>
        <b>Top Decks</b>
      </span>
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
      <ArticleList />
    </div>
  </Layout>
);

export default index;
