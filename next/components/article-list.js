import { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import ErrorMessage from './error-message';
import Article from './article';

// Kinda janky, but this is all just kinda janky
const CATEGORY_MYTHGARD = 'Mythgard';

export default function ArticleList() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const parser = new Parser();
        const feedUrl = process.browser
          ? '/articles/rss'
          : `${process.env.SSR_HOST}/articles/rss`;
        const feed = await parser.parseURL(feedUrl);
        setList(
          feed.items.filter(
            itm =>
              Array.isArray(itm.categories) &&
              itm.categories.includes(CATEGORY_MYTHGARD)
          )
        );
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) return <ErrorMessage message="Unable to load articles." />;
  if (isLoading) return <div>Loading</div>;
  if (!list.length) return <div>No recent articles.</div>;

  return (
    <div>
      {list.map((feedItem, ix) => (
        <Article
          key={ix}
          title={feedItem.title}
          url={feedItem.guid}
          description={feedItem.content}
          date={new Date(feedItem.isoDate)}
        />
      ))}
    </div>
  );
}
