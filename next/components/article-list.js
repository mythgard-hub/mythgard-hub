import PropTypes from 'prop-types';
import Article from './article';
import useConfig from '../lib/use-config.js';

function ArticleList({ max }) {
  const { config } = useConfig();

  const list = (config && config.topMedia) || [];

  return (
    <div>
      {list.slice(0, max).map((item, ix) => (
        <Article
          key={ix}
          title={item.title}
          url={item.url}
          author={item.author}
          description={item.description}
          date={new Date(item.date)}
        />
      ))}
    </div>
  );
}

ArticleList.propTypes = {
  max: PropTypes.number
};

ArticleList.defaultProps = {
  max: Math.infinity
};

export default ArticleList;
