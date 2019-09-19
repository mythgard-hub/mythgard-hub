import PropTypes from 'prop-types';
import Article from './article';

function ArticleList({ max }) {
  const list = [
    {
      title: 'Dope Article 1',
      url: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: new Date()
    },
    {
      title: 'Dope Article 2',
      url: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: new Date()
    },
    {
      title: 'Dope Article 3',
      url: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: new Date()
    }
  ];

  return (
    <div>
      {list.slice(0, max).map((item, ix) => (
        <Article
          key={ix}
          title={item.title}
          url={item.url}
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
