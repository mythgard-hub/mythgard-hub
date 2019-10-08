import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import ArticleList from '../components/article-list';

const ArticlesPage = () => {
  return (
    <Layout>
      <PageBanner image={PageBanner.IMG_ARTICLES}>Media</PageBanner>
      <br />
      <ArticleList />
    </Layout>
  );
};

export default ArticlesPage;
